/**
 * YouTube Transcript & Metadata Service
 * 
 * Multi-strategy transcript fetcher for YouTube videos:
 * 1. Primary: Free community transcript proxy API
 * 2. Fallback: YouTube internal captions endpoint via CORS proxy
 * 3. Manual: Allow user to paste transcript if APIs fail
 * 
 * Metadata: YouTube oEmbed API (no API key required)
 */

import { extractYouTubeVideoId } from '../utils/youtubeUtils';

// ─── Types ──────────────────────────────────────────────────────

export interface TranscriptSegment {
  text: string;
  start: number;     // seconds
  duration: number;  // seconds
}

export interface VideoMetadata {
  videoId: string;
  title: string;
  channel: string;
  thumbnailUrl: string;
  duration: string | null;  // formatted e.g. "12:45" or null if unavailable
  url: string;
}

export interface TranscriptResult {
  success: boolean;
  segments: TranscriptSegment[];
  fullText: string;
  language?: string;
  error?: 'transcript_unavailable' | 'video_unavailable' | 'network_error' | 'invalid_url';
  errorMessage?: string;
}

export interface TranscriptChunk {
  chunkIndex: number;
  text: string;
  startTime: number;
  endTime: number;
  startTimestamp: string;
  endTimestamp: string;
  tokenEstimate: number;
}

// ─── Constants ──────────────────────────────────────────────────

const TRANSCRIPT_PROXY_URLS = [
  'https://yt-transcript-api.vercel.app/api/transcript',
  'https://youtube-transcript-api.vercel.app/api/transcript',
];

const CORS_PROXIES = [
  'https://corsproxy.io/?url=',
  'https://api.allorigins.win/raw?url=',
];

// ─── Video Metadata (oEmbed) ────────────────────────────────────

export async function fetchVideoMetadata(urlOrId: string): Promise<VideoMetadata> {
  const videoId = extractYouTubeVideoId(urlOrId);
  if (!videoId) {
    throw new Error('Invalid YouTube URL or video ID');
  }

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;

  try {
    const response = await fetch(oembedUrl);
    if (!response.ok) {
      throw new Error(`oEmbed API returned ${response.status}`);
    }
    const data = await response.json();
    
    return {
      videoId,
      title: data.title || 'Untitled Video',
      channel: data.author_name || 'Unknown Channel',
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: null, // oEmbed doesn't return duration; we'll extract from transcript
      url: watchUrl,
    };
  } catch (err) {
    // Fallback: return basic metadata even if oEmbed fails
    return {
      videoId,
      title: 'YouTube Video',
      channel: 'Unknown Channel',
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      duration: null,
      url: watchUrl,
    };
  }
}

// ─── Transcript Fetching (Multi-Strategy) ───────────────────────

/**
 * Primary strategy: Use free transcript proxy APIs
 */
async function fetchTranscriptFromProxy(videoId: string): Promise<TranscriptResult> {
  for (const baseUrl of TRANSCRIPT_PROXY_URLS) {
    try {
      const url = `${baseUrl}?videoId=${videoId}`;
      const response = await fetch(url, {
        signal: AbortSignal.timeout(15000),
      });
      
      if (!response.ok) continue;
      
      const data = await response.json();
      
      // Different proxy APIs may return different formats
      let segments: TranscriptSegment[] = [];
      
      if (Array.isArray(data)) {
        segments = data.map((item: any) => ({
          text: cleanSegmentText(item.text || item.content || ''),
          start: parseFloat(item.start || item.offset || item.startTime || 0),
          duration: parseFloat(item.duration || item.dur || 0),
        }));
      } else if (data.transcript && Array.isArray(data.transcript)) {
        segments = data.transcript.map((item: any) => ({
          text: cleanSegmentText(item.text || item.content || ''),
          start: parseFloat(item.start || item.offset || 0),
          duration: parseFloat(item.duration || item.dur || 0),
        }));
      } else if (data.segments && Array.isArray(data.segments)) {
        segments = data.segments.map((item: any) => ({
          text: cleanSegmentText(item.text || ''),
          start: parseFloat(item.start || 0),
          duration: parseFloat(item.duration || 0),
        }));
      }
      
      if (segments.length > 0) {
        return {
          success: true,
          segments,
          fullText: mergeSegmentsToText(segments),
          language: data.language || undefined,
        };
      }
    } catch (err) {
      // Try next proxy
      continue;
    }
  }
  
  return {
    success: false,
    segments: [],
    fullText: '',
    error: 'transcript_unavailable',
  };
}

function extractCaptionTracksFromHtml(html: string): any[] | null {
  const startIdx = html.indexOf('"captionTracks":');
  if (startIdx === -1) return null;
  const arrayStart = html.indexOf('[', startIdx);
  if (arrayStart === -1) return null;
  
  let depth = 0;
  let inString = false;
  let escapeNext = false;
  
  for (let i = arrayStart; i < html.length; i++) {
    const char = html[i];
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '[') depth++;
      else if (char === ']') {
        depth--;
        if (depth === 0) {
          const jsonStr = html.substring(arrayStart, i + 1);
          try {
            return JSON.parse(jsonStr);
          } catch {
            return null;
          }
        }
      }
    }
  }
  return null;
}

/**
 * Fallback strategy: Fetch YouTube page and extract caption tracks
 */
async function fetchTranscriptViaCorsProxy(videoId: string): Promise<TranscriptResult> {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  
  for (const proxyBase of CORS_PROXIES) {
    try {
      const proxiedUrl = `${proxyBase}${encodeURIComponent(watchUrl)}`;
      const response = await fetch(proxiedUrl, {
        signal: AbortSignal.timeout(15000),
      });
      
      if (!response.ok) continue;
      
      const html = await response.text();
      
      // Extract captions URL from ytInitialPlayerResponse
      const captionTracks = extractCaptionTracksFromHtml(html);
      if (!captionTracks || captionTracks.length === 0) continue;
        
        // Prefer English or Hindi, otherwise take first available
        const preferredTrack =
          captionTracks.find((t: any) => t.languageCode === 'en') ||
          captionTracks.find((t: any) => t.languageCode === 'hi') ||
          captionTracks[0];
        
        if (!preferredTrack?.baseUrl) continue;
        
        // Fetch the actual caption XML
        const captionUrl = preferredTrack.baseUrl.replace(/\\u0026/g, '&');
        const captionResponse = await fetch(`${proxyBase}${encodeURIComponent(captionUrl)}`, {
          signal: AbortSignal.timeout(10000),
        });
        
        if (!captionResponse.ok) continue;
        
        const captionXml = await captionResponse.text();
        const segments = parseTimedTextXml(captionXml);
        
        if (segments.length > 0) {
          return {
            success: true,
            segments,
            fullText: mergeSegmentsToText(segments),
            language: preferredTrack.languageCode || undefined,
          };
        }
    } catch {
      continue;
    }
  }
  
  return {
    success: false,
    segments: [],
    fullText: '',
    error: 'transcript_unavailable',
  };
}

/**
 * Main public function: fetch transcript using all available strategies
 */
export async function fetchTranscript(urlOrId: string): Promise<TranscriptResult> {
  const videoId = extractYouTubeVideoId(urlOrId);
  if (!videoId) {
    return {
      success: false,
      segments: [],
      fullText: '',
      error: 'invalid_url',
      errorMessage: 'Please enter a valid YouTube video URL.',
    };
  }

  // Strategy 1: Proxy API
  try {
    const proxyResult = await fetchTranscriptFromProxy(videoId);
    if (proxyResult.success) return proxyResult;
  } catch {
    // Continue to next strategy
  }

  // Strategy 2: CORS proxy + YouTube page scraping
  try {
    const corsResult = await fetchTranscriptViaCorsProxy(videoId);
    if (corsResult.success) return corsResult;
  } catch {
    // Continue
  }

  // All strategies failed
  return {
    success: false,
    segments: [],
    fullText: '',
    error: 'transcript_unavailable',
    errorMessage: 'This video does not have an accessible transcript. You can paste the transcript manually below.',
  };
}

// ─── Transcript Processing ──────────────────────────────────────

/**
 * Clean individual segment text: strip HTML tags, decode entities, normalize whitespace
 */
function cleanSegmentText(raw: string): string {
  return raw
    .replace(/<[^>]+>/g, '')               // Strip HTML tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\[.*?\]/g, '')               // Strip [Music], [Applause] etc.
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Merge transcript segments into a single readable text with timestamps
 */
function mergeSegmentsToText(segments: TranscriptSegment[]): string {
  if (!segments.length) return '';
  
  const lines: string[] = [];
  let currentParagraph = '';
  let paragraphStart = segments[0].start;
  
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (!seg.text.trim()) continue;
    
    // Start a new paragraph every ~30 seconds or on sentence-ending punctuation
    const timeSinceParagraphStart = seg.start - paragraphStart;
    const endsWithSentence = /[.!?।]$/.test(currentParagraph.trim());
    
    if (timeSinceParagraphStart > 30 && endsWithSentence && currentParagraph.length > 50) {
      lines.push(currentParagraph.trim());
      currentParagraph = seg.text + ' ';
      paragraphStart = seg.start;
    } else {
      currentParagraph += seg.text + ' ';
    }
  }
  
  if (currentParagraph.trim()) {
    lines.push(currentParagraph.trim());
  }
  
  return lines.join('\n\n');
}

/**
 * Parse YouTube TimedText XML format into segments
 */
function parseTimedTextXml(xml: string): TranscriptSegment[] {
  const segments: TranscriptSegment[] = [];
  const regex = /<text\s+start="([^"]*)"(?:\s+dur="([^"]*)")?\s*>([\s\S]*?)<\/text>/g;
  let match: RegExpExecArray | null;
  
  while ((match = regex.exec(xml)) !== null) {
    const start = parseFloat(match[1]) || 0;
    const duration = parseFloat(match[2]) || 0;
    const text = cleanSegmentText(match[3]);
    
    if (text) {
      segments.push({ text, start, duration });
    }
  }
  
  return segments;
}

/**
 * Estimate video duration from transcript segments
 */
export function estimateDurationFromTranscript(segments: TranscriptSegment[]): string | null {
  if (!segments.length) return null;
  const lastSeg = segments[segments.length - 1];
  const totalSeconds = Math.ceil(lastSeg.start + lastSeg.duration);
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Segment transcript into topic-level chunks for AI processing
 * Respects token limits and preserves timestamp context
 */
export function segmentTranscriptIntoChunks(
  segments: TranscriptSegment[],
  maxChunkTokens: number = 5000
): TranscriptChunk[] {
  if (!segments.length) return [];
  
  const chunks: TranscriptChunk[] = [];
  let currentChunkText = '';
  let currentChunkStart = segments[0].start;
  let currentTokenEstimate = 0;
  let chunkIndex = 0;
  
  for (const seg of segments) {
    const segTokens = estimateTokens(seg.text);
    
    if (currentTokenEstimate + segTokens > maxChunkTokens && currentChunkText.trim()) {
      // Flush current chunk
      chunks.push({
        chunkIndex,
        text: currentChunkText.trim(),
        startTime: currentChunkStart,
        endTime: seg.start,
        startTimestamp: formatSeconds(currentChunkStart),
        endTimestamp: formatSeconds(seg.start),
        tokenEstimate: currentTokenEstimate,
      });
      chunkIndex++;
      currentChunkText = '';
      currentChunkStart = seg.start;
      currentTokenEstimate = 0;
    }
    
    currentChunkText += seg.text + ' ';
    currentTokenEstimate += segTokens;
  }
  
  // Flush remaining
  if (currentChunkText.trim()) {
    const lastSeg = segments[segments.length - 1];
    chunks.push({
      chunkIndex,
      text: currentChunkText.trim(),
      startTime: currentChunkStart,
      endTime: lastSeg.start + lastSeg.duration,
      startTimestamp: formatSeconds(currentChunkStart),
      endTimestamp: formatSeconds(lastSeg.start + lastSeg.duration),
      tokenEstimate: currentTokenEstimate,
    });
  }
  
  return chunks;
}

/**
 * Rough token estimation (~4 chars per token for English, ~2.5 for Hindi/Devanagari)
 */
function estimateTokens(text: string): number {
  if (!text) return 0;
  // Check for Devanagari / Hindi characters
  const devanagariRatio = (text.match(/[\u0900-\u097F]/g) || []).length / text.length;
  const charsPerToken = devanagariRatio > 0.3 ? 2.5 : 4;
  return Math.ceil(text.length / charsPerToken);
}

/**
 * Format seconds to timestamp string
 */
function formatSeconds(totalSeconds: number): string {
  const total = Math.floor(Math.max(0, totalSeconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Parse manually pasted transcript text into segments
 * Handles common formats: plain text, timestamped lines, SRT, etc.
 */
export function parseManualTranscript(rawText: string): TranscriptSegment[] {
  if (!rawText || !rawText.trim()) return [];
  
  const lines = rawText.split('\n').filter(l => l.trim());
  const segments: TranscriptSegment[] = [];
  
  // Check if text has timestamps (MM:SS or HH:MM:SS format)
  const timestampRegex = /^(?:\[?\s*)?(\d{1,2}:\d{2}(?::\d{2})?)\s*[\]\-–—:)]*\s*(.*)/;
  let hasTimestamps = false;
  
  for (const line of lines) {
    const match = line.trim().match(timestampRegex);
    if (match) {
      hasTimestamps = true;
      const timeStr = match[1];
      const text = match[2].trim();
      if (text) {
        const parts = timeStr.split(':').map(Number);
        let startSeconds = 0;
        if (parts.length === 3) {
          startSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
        } else if (parts.length === 2) {
          startSeconds = parts[0] * 60 + parts[1];
        }
        segments.push({
          text: cleanSegmentText(text),
          start: startSeconds,
          duration: 0,
        });
      }
    }
  }
  
  if (hasTimestamps && segments.length > 0) {
    // Fill in durations
    for (let i = 0; i < segments.length - 1; i++) {
      segments[i].duration = segments[i + 1].start - segments[i].start;
    }
    if (segments.length > 0) {
      segments[segments.length - 1].duration = 30; // Estimate last segment
    }
    return segments;
  }
  
  // No timestamps: split text into ~30-second estimated segments
  const words = rawText.split(/\s+/);
  const wordsPerSegment = 50; // ~30 seconds of speech
  let currentTime = 0;
  
  for (let i = 0; i < words.length; i += wordsPerSegment) {
    const chunk = words.slice(i, i + wordsPerSegment).join(' ');
    segments.push({
      text: cleanSegmentText(chunk),
      start: currentTime,
      duration: 30,
    });
    currentTime += 30;
  }
  
  return segments;
}
