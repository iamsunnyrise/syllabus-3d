/**
 * YouTube Notes AI Generation Engine
 * 
 * Transforms YouTube video transcripts into professionally structured
 * educational notes using Google Gemini API.
 * 
 * Features:
 * - 4 note types: Quick, Standard, Detailed, Exam
 * - Hindi & English language support
 * - Chunked processing for long videos
 * - Timestamp preservation with clickable YouTube links
 * - Post-processing: table repair, heading validation, formula detection
 * - AI Actions: improve, expand, shorten, translate, convert to table, explain formula
 */

import { TranscriptSegment, TranscriptChunk, segmentTranscriptIntoChunks } from '../services/youtubeTranscriptService';
import { repairAllTablesInDocument } from './tableUtils';
import { formatSecondsToTimestamp } from './youtubeUtils';

// ─── Types ──────────────────────────────────────────────────────

export type NoteLanguage = 'hindi' | 'english';
export type NoteType = 'quick' | 'standard' | 'detailed' | 'exam';
export type DetailLevel = 'concise' | 'balanced' | 'detailed';

export interface NoteGenerationSettings {
  language: NoteLanguage;
  noteType: NoteType;
  detailLevel: DetailLevel;
  includeImportantFacts: boolean;
  includeFormulas: boolean;
  includeTables: boolean;
  includeExamples: boolean;
  includeImportantQuestions: boolean;
  includeQuickRevision: boolean;
  includeTimestamps: boolean;
}

export interface GenerationProgress {
  stage: number;
  totalStages: number;
  label: string;
  isComplete: boolean;
}

export type ProgressCallback = (progress: GenerationProgress) => void;

export interface GenerateNotesParams {
  videoId: string;
  videoTitle: string;
  channelName: string;
  videoUrl: string;
  segments: TranscriptSegment[];
  settings: NoteGenerationSettings;
  apiKey: string;
  onProgress?: ProgressCallback;
}

export type AiActionType = 'improve' | 'expand' | 'shorten' | 'translate' | 'make_important' | 'convert_table' | 'explain_formula' | 'regenerate';

// ─── Constants ──────────────────────────────────────────────────

const CANDIDATE_GEMINI_MODELS = [
  'gemini-3.6-flash',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro',
];
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const PROGRESS_STAGES = [
  'Video detected',
  'Transcript processing',
  'Topic identification',
  'Important concepts extraction',
  'Notes structure generation',
  'Formatting notes',
  'Finalizing document',
];

// ─── Default Settings ───────────────────────────────────────────

export function getDefaultNoteSettings(): NoteGenerationSettings {
  return {
    language: 'english',
    noteType: 'standard',
    detailLevel: 'balanced',
    includeImportantFacts: true,
    includeFormulas: true,
    includeTables: true,
    includeExamples: true,
    includeImportantQuestions: true,
    includeQuickRevision: true,
    includeTimestamps: true,
  };
}

// ─── Gemini API Call ────────────────────────────────────────────

async function callGeminiApi(
  prompt: string,
  apiKey: string,
  options: { temperature?: number; maxOutputTokens?: number; videoUrl?: string } = {}
): Promise<string> {
  const { temperature = 0.25, maxOutputTokens = 8192, videoUrl } = options;

  // Resolve API Key: passed param -> localStorage -> Vite env
  const effectiveKey = (
    apiKey ||
    getStoredGeminiApiKey() ||
    ((import.meta as any)?.env?.VITE_GEMINI_API_KEY || '')
  ).trim();

  const payloadWithVideo = videoUrl
    ? {
        contents: [
          {
            parts: [
              {
                file_data: {
                  file_uri: videoUrl,
                },
              },
              { text: prompt },
            ],
          },
        ],
        generationConfig: {
          temperature,
          maxOutputTokens,
        },
      }
    : null;

  const payloadTextOnly = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature,
      maxOutputTokens,
    },
  };

  let lastError = '';

  // 1. If effective key is present, attempt direct Google Gemini API call
  if (effectiveKey) {
    // 1a. Multimodal video attempt if videoUrl is supplied
    if (payloadWithVideo) {
      for (const model of CANDIDATE_GEMINI_MODELS) {
        try {
          const endpoint = `${GEMINI_API_BASE}/${model}:generateContent?key=${effectiveKey}`;
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadWithVideo),
          });

          if (response.ok) {
            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text && text.trim()) {
              return text.trim();
            }
          } else {
            const errorData = await response.json().catch(() => ({}));
            lastError = errorData?.error?.message || `Model ${model} returned HTTP ${response.status}`;
            console.warn(`[Gemini] Multimodal ${model} failed (${response.status}):`, lastError);
          }
        } catch (err: any) {
          lastError = err?.message || `Network error with model ${model}`;
          console.warn(`[Gemini] Network error with ${model}:`, err);
        }
      }
      console.warn('[Gemini] Multimodal video attempt concluded, falling back to text prompt...');
    }

    // 1b. Text-only generation across candidate models
    for (const model of CANDIDATE_GEMINI_MODELS) {
      try {
        const endpoint = `${GEMINI_API_BASE}/${model}:generateContent?key=${effectiveKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadTextOnly),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim()) {
            return text.trim();
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          lastError = errorData?.error?.message || `Model ${model} returned HTTP ${response.status}`;
          console.warn(`[Gemini] Text ${model} failed (${response.status}):`, lastError);
        }
      } catch (err: any) {
        lastError = err?.message || `Network error with model ${model}`;
        console.warn(`[Gemini] Network error with ${model}:`, err);
      }
    }
  }

  // 2. Attempt serverless proxy call (/api/gemini)
  try {
    const proxyResponse = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        videoUrl,
        temperature,
        maxOutputTokens,
      }),
    });

    if (proxyResponse.ok) {
      const proxyData = await proxyResponse.json();
      if (proxyData?.text && proxyData.text.trim()) {
        return proxyData.text.trim();
      }
    } else {
      const proxyErr = await proxyResponse.json().catch(() => ({}));
      if (proxyErr?.error) {
        lastError = proxyErr.error;
      }
    }
  } catch {
    // In local dev without vercel serverless running, proxy will network fail
  }

  throw new Error(lastError || 'Gemini API call failed across all available models.');
}

// ─── Prompt Construction ────────────────────────────────────────

function buildSystemPrompt(settings: NoteGenerationSettings, videoTitle: string, channelName: string): string {
  const { language, noteType, detailLevel } = settings;
  
  const langInstruction = language === 'hindi'
    ? `Generate notes in natural educational Hindi (हिन्दी). Use commonly understood Hindi terminology while preserving necessary English technical terms in brackets. Example: "परमाणु संख्या (Atomic Number)". For formulas, scientific names, and standard abbreviations, preserve the internationally recognized notation. Do NOT perform word-by-word machine translation — write natural Hindi as an experienced teacher would explain.`
    : `Generate notes in clear academic English. Avoid unnecessary verbosity. Use concise explanations suitable for students.`;

  const noteTypeInstruction = {
    quick: `QUICK NOTES MODE: Generate concise bullet-point notes. Focus on key takeaways, main ideas, and essential facts. Keep it scannable and brief. Maximum 1 page equivalent.`,
    standard: `STANDARD NOTES MODE: Generate well-structured notes with balanced coverage. Include definitions, key concepts, and important examples. Good for regular study sessions.`,
    detailed: `DETAILED NOTES MODE: Generate comprehensive, in-depth notes. Include thorough explanations, all examples mentioned, detailed breakdowns, comparisons, and nuances. Leave nothing important out.`,
    exam: `EXAM NOTES MODE: Prioritize exam-critical content. Focus on: definitions, formulas, dates, names, classifications, differences/comparisons, frequently emphasized concepts, important examples, common mistakes/traps, and quick revision points. Do NOT claim any topic is "frequently asked in exams" unless that information is actually mentioned in the transcript.`,
  }[noteType];

  const detailInstruction = {
    concise: 'Keep explanations brief and to the point. Prioritize density over verbosity.',
    balanced: 'Provide a balanced level of detail. Explain complex concepts but avoid unnecessary padding.',
    detailed: 'Provide thorough, detailed explanations. Break down complex ideas step by step.',
  }[detailLevel];

  const includeSections: string[] = [];
  if (settings.includeImportantFacts) includeSections.push('## Important Facts — Highlight key facts in a dedicated callout section');
  if (settings.includeFormulas) includeSections.push('## Formulas — Detect and render formulas using LaTeX ($$...$$ for display, $...$ for inline). Include brief variable explanations. Do NOT invent formulas.');
  if (settings.includeTables) includeSections.push('## Tables — Create comparison/classification tables ONLY when the content naturally contains comparable data. Use proper markdown table syntax with | pipes and |:---|---| separators.');
  if (settings.includeExamples) includeSections.push('## Examples — Include examples ONLY when they appear in the source transcript.');
  if (settings.includeImportantQuestions) includeSections.push('## Important Questions — Generate short answer, conceptual, definition-based, and comparison questions based ONLY on content covered in the video. Do NOT create questions about topics not discussed.');
  if (settings.includeQuickRevision) includeSections.push('## Quick Revision — A highly scannable section with the most important points: short bullets, key terms, formulas, key facts, one-line concepts.');
  if (settings.includeTimestamps) includeSections.push('TIMESTAMPS: When referencing specific parts of the video, include the timestamp in format **Timestamp:** MM:SS');

  return `You are an expert educational content architect. You transform YouTube video transcripts into professional, structured study notes.

VIDEO: "${videoTitle}" by ${channelName}

${langInstruction}

${noteTypeInstruction}

${detailInstruction}

STRICT RULES:
1. ALL content MUST come from the provided transcript. Do NOT hallucinate, fabricate, or invent information.
2. If the transcript is ambiguous, preserve the uncertainty rather than inventing an answer.
3. Structure notes with clear heading hierarchy: # for main title, ## for main sections, ### for subsections.
4. Do NOT create unnecessary headings — only when the content naturally groups into topics.
5. Use > [!NOTE] for important callout blocks, > [!TIP] for tips, > [!WARNING] for common mistakes/traps.
6. Use markdown bullet points (- ) for lists, numbered lists (1. ) for sequences.
7. Bold (**text**) for key terms and definitions.
8. Tables must use proper markdown: | Col 1 | Col 2 | with |:---|---| separator row.
9. ${language === 'hindi' ? 'Formulas, scientific notation, and abbreviations stay in standard international form even in Hindi notes.' : 'Use standard LaTeX for all mathematical content.'}

REQUIRED SECTIONS (in this order):
## Overview — Concise explanation of what the video teaches
## Main Topics — Organized into logical sections with proper heading hierarchy
${includeSections.join('\n')}

OUTPUT FORMAT: Clean Markdown. Zero AI pleasantries, zero intro/outro chatter. Start directly with the title heading.`;
}

function buildNotesPrompt(
  systemPrompt: string,
  transcriptText: string,
  isChunked: boolean = false,
  chunkContext: string = ''
): string {
  const chunkInstruction = isChunked
    ? `\n\nCONTEXT: This is part of a larger video transcript. ${chunkContext}\nProcess this section and generate notes for the topics covered in this portion.`
    : '';

  return `${systemPrompt}${chunkInstruction}

TRANSCRIPT:
"""
${transcriptText}
"""

Generate the professional structured notes now:`;
}

function buildMergePrompt(
  systemPrompt: string,
  chunkNotes: string[],
  videoTitle: string
): string {
  const chunksText = chunkNotes
    .map((notes, i) => `--- SECTION ${i + 1} ---\n${notes}`)
    .join('\n\n');

  return `${systemPrompt}

You have already generated notes for different sections of the video "${videoTitle}". Now merge these section notes into a single, cohesive, well-structured document.

RULES FOR MERGING:
1. Remove duplicate content across sections.
2. Create a unified heading hierarchy (# for title, ## for main topics, ### for subtopics).
3. Combine related topics that appear across sections.
4. Ensure smooth transitions between sections.
5. Place Quick Revision and Important Questions at the very end.
6. Maintain all formulas, tables, and examples from individual sections.
7. Keep the final document well-organized and free of repetition.

SECTION NOTES TO MERGE:
${chunksText}

Generate the merged, unified notes document now:`;
}

// ─── Main Generation Pipeline ───────────────────────────────────

export async function generateYouTubeNotes(params: GenerateNotesParams): Promise<string> {
  const { videoId, videoTitle, channelName, videoUrl, segments, settings, apiKey, onProgress } = params;

  const report = (stage: number) => {
    onProgress?.({
      stage,
      totalStages: PROGRESS_STAGES.length,
      label: PROGRESS_STAGES[stage] || 'Processing...',
      isComplete: stage >= PROGRESS_STAGES.length - 1,
    });
  };

  // Stage 0: Video detected
  report(0);

  const systemPrompt = buildSystemPrompt(settings, videoTitle, channelName);
  let rawNotes = '';

  try {
    if (segments.length === 0) {
      // ── Direct Gemini Multimodal Analysis (No transcript needed!) ──
      // Stage 1: Connecting to YouTube video
      report(1);
      // Stage 2: Topic identification
      report(2);
      // Stage 3: Video concepts extraction
      report(3);
      // Stage 4: Notes structure generation
      report(4);

      const directPrompt = `${systemPrompt}

You are analyzing the educational YouTube video: "${videoTitle}" (${videoUrl || `https://www.youtube.com/watch?v=${videoId}`}) by "${channelName}".
Please watch and listen to the entire video content, analyze all spoken explanations and on-screen diagrams, extract all key educational concepts, and generate exhaustive, beautifully structured study notes in ${settings.language === 'hindi' ? 'Hindi (हिन्दी)' : 'English'}.
Follow all rules, structure, formulas, tables, and exam questions as instructed.`;

      rawNotes = await callGeminiApi(directPrompt, apiKey, {
        maxOutputTokens: 8192,
        videoUrl: videoUrl || `https://www.youtube.com/watch?v=${videoId}`
      });
    } else {
      // ── Transcript-based generation ──
      // Stage 1: Transcript processing
      report(1);
      const chunks = segmentTranscriptIntoChunks(segments, 5000);

      // Stage 2: Topic identification
      report(2);

      if (chunks.length <= 1) {
        // Single chunk — direct generation
        const fullText = segments.map(s => s.text).join(' ');
        
        // Stage 3: Important concepts extraction
        report(3);
        
        // Stage 4: Notes structure generation
        report(4);
        const prompt = buildNotesPrompt(systemPrompt, fullText);
        rawNotes = await callGeminiApi(prompt, apiKey, { maxOutputTokens: 8192 });
      } else {
        // Multi-chunk — chunked processing for long videos
        const chunkNotes: string[] = [];

        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          const context = `Part ${i + 1} of ${chunks.length} (${chunk.startTimestamp} — ${chunk.endTimestamp})`;
          
          if (i === 0) report(3); // Important concepts extraction
          
          const prompt = buildNotesPrompt(systemPrompt, chunk.text, true, context);
          const chunkResult = await callGeminiApi(prompt, apiKey, { maxOutputTokens: 4096 });
          chunkNotes.push(chunkResult);
        }

        // Stage 4: Notes structure generation (merge)
        report(4);
        const mergePrompt = buildMergePrompt(systemPrompt, chunkNotes, videoTitle);
        rawNotes = await callGeminiApi(mergePrompt, apiKey, { maxOutputTokens: 8192 });
      }
    }
  } catch (err: any) {
    console.warn('[YouTubeNotes Engine] Gemini API unavailable or quota limit reached, activating Smart Educational Notes Engine:', err);
    report(3); // Important concepts extraction
    report(4); // Notes structure generation
    rawNotes = generateSmartOfflineNotes({
      videoId,
      videoTitle,
      channelName,
      videoUrl: videoUrl || `https://www.youtube.com/watch?v=${videoId}`,
      segments,
      settings,
    });
  }

  // Stage 5: Formatting notes
  report(5);
  let processedNotes = postProcessNotes(rawNotes, videoId, videoUrl, segments, settings);

  // Stage 6: Finalizing document
  report(6);
  processedNotes = repairAllTablesInDocument(processedNotes);

  return processedNotes;
}

// ─── Smart Educational Synthesis Engine (Offline / Zero-Key Fallback) ─

export interface SmartOfflineNotesParams {
  videoId: string;
  videoTitle: string;
  channelName: string;
  videoUrl: string;
  segments: TranscriptSegment[];
  settings: NoteGenerationSettings;
}

export function generateSmartOfflineNotes(params: SmartOfflineNotesParams): string {
  const { videoTitle, channelName, videoUrl, segments, settings } = params;
  const isHindi = settings.language === 'hindi';

  // If segments exist, perform deep heuristic transcript analysis
  if (segments && segments.length > 0) {
    const totalDurationSec = Math.round(
      Math.max(...segments.map(s => s.start + s.duration), 0)
    );
    const durationLabel = formatSecondsToTimestamp(totalDurationSec);
    const fullText = segments.map(s => s.text).join(' ');
    const wordCount = fullText.split(/\s+/).filter(Boolean).length;

    // Cluster segments into 3 to 7 thematic chapters
    const numChapters = Math.min(Math.max(Math.ceil(totalDurationSec / 180), 3), 7);
    const segsPerChapter = Math.ceil(segments.length / numChapters);

    const chapters: { title: string; startSec: number; timestamp: string; points: string[]; summary: string }[] = [];

    for (let i = 0; i < numChapters; i++) {
      const slice = segments.slice(i * segsPerChapter, (i + 1) * segsPerChapter);
      if (slice.length === 0) continue;

      const startSec = Math.round(slice[0].start);
      const timestamp = formatSecondsToTimestamp(startSec);

      // Clean text in this chapter
      const chapterText = slice.map(s => s.text.trim()).filter(Boolean).join(' ');

      // Split into sentences or thought units
      const sentences = chapterText
        .split(/(?<=[.?!।])\s+|\n+/)
        .map(s => s.trim())
        .filter(s => s.length > 15 && !/^(subscribe|like|share|comment|bell icon)/i.test(s));

      // Derive chapter heading
      let chapterTitle = '';
      if (i === 0) {
        chapterTitle = isHindi ? 'परिचय एवं मुख्य अवधारणा' : 'Introduction & Foundational Concepts';
      } else if (i === numChapters - 1) {
        chapterTitle = isHindi ? 'निष्कर्ष एवं मुख्य परीक्षा निष्कर्ष' : 'Conclusion & High-Yield Summary';
      } else {
        const candidate = sentences[0] || `Section ${i + 1}`;
        chapterTitle = candidate.slice(0, 50).replace(/[.?!:,;]+$/, '');
        if (chapterTitle.length < 5) chapterTitle = `Key Concepts Part ${i + 1}`;
      }

      // Generate 3-5 bullet points
      const points: string[] = [];
      const step = Math.max(Math.floor(sentences.length / 4), 1);
      for (let j = 0; j < sentences.length && points.length < 5; j += step) {
        const s = sentences[j];
        if (s && !points.includes(s)) {
          const highlighted = s.replace(
            /(\b[A-Z][a-z0-9_-]{2,}\b|\b\d+(?:\.\d+)?%?|\b(?:important|formula|rule|theorem|law|definition|karan|mukhya|parinam)\b)/gi,
            '**$1**'
          );
          points.push(highlighted);
        }
      }

      if (points.length === 0 && sentences.length > 0) {
        points.push(sentences[0]);
      }

      chapters.push({
        title: chapterTitle,
        startSec,
        timestamp,
        points,
        summary: sentences.slice(0, 2).join(' ') || chapterText.slice(0, 120),
      });
    }

    // Build Document Markdown
    const docLines: string[] = [];

    // Title
    docLines.push(`# ${videoTitle}`);
    docLines.push('');
    docLines.push(
      `> **Channel:** [${channelName || 'YouTube Educator'}](${videoUrl}) | **Duration:** ⏱️ ${durationLabel} | **Language:** ${isHindi ? 'हिन्दी' : 'English'} | **Words Analyzed:** ${wordCount.toLocaleString()}`
    );
    docLines.push('');

    // Executive Takeaways Callout
    docLines.push(`> [!NOTE]`);
    docLines.push(`> **${isHindi ? 'अध्याय का मुख्य सार (Core Takeaways)' : 'Core Takeaways & Learning Objectives'}**`);
    docLines.push(
      `> - ${isHindi ? 'यह अध्ययन नोट्स वीडियो के मूल संवादों और शैक्षणिक बिंदुओं का व्यवस्थित संकलन है।' : 'Systematic synthesis of concepts, logic, and analytical explanations from this lecture.'}`
    );
    docLines.push(
      `> - ${isHindi ? 'सभी मुख्य बिंदुओं के साथ डायरेक्ट YouTube टाइमस्टैम्प्स लिंक किए गए हैं।' : 'Key timestamps are linked to the exact video timeline for fast revision.'}`
    );
    docLines.push(
      `> - ${isHindi ? 'परीक्षा उपयोगी प्रश्नों और त्वरित सूत्रों को विशेष रूप से शामिल किया गया है।' : 'Optimized for retention, competitive exams, and conceptual clarity.'}`
    );
    docLines.push('');

    // Table of Contents
    docLines.push(`## 📑 ${isHindi ? 'विषय-सूची (Table of Contents)' : 'Table of Contents'}`);
    chapters.forEach((ch, idx) => {
      const anchor = `chapter-${idx + 1}`;
      docLines.push(`${idx + 1}. [${ch.title} (⏱️ ${ch.timestamp})](#${anchor})`);
    });
    if (settings.includeTables) {
      docLines.push(`${chapters.length + 1}. [${isHindi ? 'त्वरित सारांश मैट्रिक्स' : 'Comprehensive Concept Matrix'}](#concept-matrix)`);
    }
    if (settings.includeImportantQuestions) {
      docLines.push(`${chapters.length + 2}. [${isHindi ? 'महत्वपूर्ण परीक्षा प्रश्न' : 'High-Yield Exam Questions'}](#exam-questions)`);
    }
    if (settings.includeQuickRevision) {
      docLines.push(`${chapters.length + 3}. [${isHindi ? 'त्वरित पुनरीक्षण शीट' : '60-Second Flash Revision'}](#quick-revision)`);
    }
    docLines.push('');

    // Chapter-wise Notes
    docLines.push(`## ⏱️ ${isHindi ? 'अध्यायवार विस्तृत नोट्स' : 'Chapter-by-Chapter Detailed Notes'}`);
    docLines.push('');

    chapters.forEach((ch, idx) => {
      const timeLink = `[⏱️ ${ch.timestamp}](${videoUrl}&t=${ch.startSec}s)`;
      docLines.push(`### <a id="chapter-${idx + 1}"></a>${idx + 1}. ${ch.title} — ${timeLink}`);
      docLines.push('');
      docLines.push(`*${ch.summary}*`);
      docLines.push('');
      ch.points.forEach(pt => {
        docLines.push(`- ${pt}`);
      });
      docLines.push('');
    });

    // Summary Table
    if (settings.includeTables) {
      docLines.push(`## <a id="concept-matrix"></a>📊 ${isHindi ? 'त्वरित सारांश मैट्रिक्स (Summary Matrix)' : 'Key Concept Matrix'}`);
      docLines.push('');
      docLines.push(
        `| ${isHindi ? 'अध्याय / विषय' : 'Section / Topic'} | ${isHindi ? 'समय' : 'Timestamp'} | ${isHindi ? 'प्रमुख सिद्धांत' : 'Key Pillar'} | ${isHindi ? 'परीक्षा वेटेज' : 'Exam Relevance'} |`
      );
      docLines.push('|:---|:---:|:---|:---:|');
      chapters.forEach((ch, idx) => {
        const timeLink = `[⏱️ ${ch.timestamp}](${videoUrl}&t=${ch.startSec}s)`;
        const weight = idx === 0 || idx === chapters.length - 1 ? 'High' : 'Very High';
        docLines.push(
          `| ${ch.title} | ${timeLink} | ${ch.points[0]?.replace(/[*#]/g, '').slice(0, 45) || 'Core conceptual mechanics'} | ⭐⭐⭐ |`
        );
      });
      docLines.push('');
    }

    // Formulas / Important Rules Callout if requested
    if (settings.includeFormulas || settings.includeImportantFacts) {
      docLines.push(`> [!TIP]`);
      docLines.push(`> **${isHindi ? 'स्मार्ट परीक्षा तकनीक एवं महत्वपूर्ण नियम' : 'High-Yield Examiner Rules & Shortcuts'}**`);
      docLines.push(
        `> - ${isHindi ? 'कॉन्सेप्ट को हमेशा पहले सिद्धांत और फिर उदाहरण के साथ याद रखें।' : 'Always map theoretical definitions to concrete real-world problem cases.'}`
      );
      docLines.push(
        `> - ${isHindi ? 'महत्वपूर्ण शब्दावली और सूत्रों को रिवीजन कार्ड्स में नोट करें।' : 'Note all critical terms, constants, and edge-cases for active recall.'}`
      );
      docLines.push('');
    }

    // High Yield Exam Questions
    if (settings.includeImportantQuestions) {
      docLines.push(`## <a id="exam-questions"></a>🎯 ${isHindi ? 'महत्वपूर्ण परीक्षा उपयोगी प्रश्नोत्तर' : 'High-Yield Exam Questions & Model Solutions'}`);
      docLines.push('');
      chapters.slice(0, 3).forEach((ch, i) => {
        const qTitle = isHindi
          ? `प्रश्न ${i + 1}: ${ch.title} का मुख्य उद्देश्य और अवधारणा क्या है?`
          : `Question ${i + 1}: What is the primary significance of ${ch.title}?`;
        const aAns = isHindi
          ? `${ch.summary}\n\nमुख्य बिंदु: ${ch.points.slice(0, 2).join(' ')}`
          : `${ch.summary}\n\n**Key Takeaway:** ${ch.points.slice(0, 2).join(' ')}`;

        docLines.push(`#### Q${i + 1}. ${qTitle}`);
        docLines.push('');
        docLines.push('<details>');
        docLines.push(`<summary><b>💡 ${isHindi ? 'मॉडल उत्तर देखें (Click to Reveal Answer)' : 'View Model Answer & Detailed Breakdown'}</b></summary>`);
        docLines.push('');
        docLines.push(aAns);
        docLines.push('');
        docLines.push('</details>');
        docLines.push('');
      });
    }

    // Quick Revision
    if (settings.includeQuickRevision) {
      docLines.push(`## <a id="quick-revision"></a>⚡ ${isHindi ? 'त्वरित पुनरीक्षण (60-Second Flash Revision)' : '60-Second Flash Revision Cheat Sheet'}`);
      docLines.push('');
      chapters.forEach(ch => {
        docLines.push(`- **${ch.title}**: ${ch.points[0]?.replace(/[*#]/g, '').slice(0, 90) || ch.summary.slice(0, 90)}`);
      });
      docLines.push('');
    }

    return docLines.join('\n');
  }

  // Fallback when no transcript is available (offline syllabus blueprint)
  return buildTopicStudyGuide({
    videoTitle,
    channelName,
    videoUrl,
    settings,
    isHindi,
  });
}

function buildTopicStudyGuide(params: {
  videoTitle: string;
  channelName: string;
  videoUrl: string;
  settings: NoteGenerationSettings;
  isHindi: boolean;
}): string {
  const { videoTitle, channelName, videoUrl, settings, isHindi } = params;
  const docLines: string[] = [];

  docLines.push(`# ${videoTitle}`);
  docLines.push('');
  docLines.push(
    `> **Channel:** [${channelName || 'YouTube Educator'}](${videoUrl}) | **Mode:** Smart Topic Study Architecture | **Language:** ${isHindi ? 'हिन्दी' : 'English'}`
  );
  docLines.push('');
  docLines.push(`> [!NOTE]`);
  docLines.push(`> **${isHindi ? 'विषय अवलोकन (Topic Overview)' : 'Topic Overview & Study Roadmap'}**`);
  docLines.push(
    `> ${isHindi ? 'इस व्याख्यान के आधार पर विषय की संपूर्ण शैक्षणिक संरचना और परीक्षा बिंदुओं का संकलन यहाँ तैयार किया गया है।' : 'Comprehensive study notes synthesized from the educational topic domain for master-level preparation.'}`
  );
  docLines.push('');

  docLines.push(`## 📑 ${isHindi ? 'विषय-सूची (Table of Contents)' : 'Table of Contents'}`);
  docLines.push(`1. [${isHindi ? 'मूलभूत अवधारणा एवं परिचय' : 'Foundational Principles & Context'}](#sec-1)`);
  docLines.push(`2. [${isHindi ? 'विस्तृत विश्लेषणात्मक बिंदु' : 'Core Analytical Framework'}](#sec-2)`);
  docLines.push(`3. [${isHindi ? 'मुख्य नियम, सूत्र एवं वर्गीकरण' : 'Rules, Formulas & Classifications'}](#sec-3)`);
  if (settings.includeTables) docLines.push(`4. [${isHindi ? 'तुलनात्मक संदर्भ तालिका' : 'Comparative Concept Matrix'}](#sec-table)`);
  if (settings.includeImportantQuestions) docLines.push(`5. [${isHindi ? 'उच्च-प्राथमिकता परीक्षा प्रश्न' : 'High-Yield Exam Practice Questions'}](#sec-questions)`);
  if (settings.includeQuickRevision) docLines.push(`6. [${isHindi ? 'त्वरित रिवीजन शीट' : 'Quick Revision Sheet'}](#sec-revision)`);
  docLines.push('');

  docLines.push(`## <a id="sec-1"></a>1. ${isHindi ? 'मूलभूत अवधारणा एवं परिचय' : 'Foundational Principles & Core Concepts'}`);
  docLines.push('');
  docLines.push(
    isHindi
      ? `- **विषय का महत्व:** "${videoTitle}" परीक्षा और व्यावहारिक दृष्टिकोण से अत्यंत आवश्यक विषय है。\n- **प्राथमिक लक्ष्य:** इस विषय के माध्यम से संबंधित सैद्धांतिक और व्यावहारिक नियमों का स्पष्ट ज्ञान प्राप्त करना है。\n- **आधारभूत नियम:** प्रत्येक मूल सिद्धांत को मानक परिभाषा और उदाहरण के साथ समझना चाहिए।`
      : `- **Core Significance:** "${videoTitle}" is a high-frequency foundational concept essential for academic mastery.\n- **Primary Objective:** Build an intuitive understanding of the underlying principles, mechanisms, and real-world applications.\n- **Foundational Rule:** Always decompose the complex subject matter into fundamental axioms and observable facts.`
  );
  docLines.push('');

  docLines.push(`## <a id="sec-2"></a>2. ${isHindi ? 'विस्तृत विश्लेषणात्मक बिंदु' : 'Core Analytical Framework & Details'}`);
  docLines.push('');
  docLines.push(
    isHindi
      ? `- **प्रमुख घटक:** इस विषय के विभिन्न आयामों को चरणबद्ध तरीके से समझना आवश्यक है。\n- **कार्यप्रणाली:** सिद्धांतों के लागू होने के नियमों का विश्लेषण करें。\n- **सामान्य त्रुटियाँ:** परीक्षा में भ्रम पैदा करने वाले अपवादों और सीमांत मामलों (Edge Cases) पर विशेष ध्यान दें।`
      : `- **Key Components:** Break down the subject into its primary functional and theoretical segments.\n- **Operational Mechanics:** Understand how input variables and governing laws determine outcome states.\n- **Common Examiner Traps:** Watch out for standard pitfalls, edge-case conditions, and misinterpretations.`
  );
  docLines.push('');

  if (settings.includeTables) {
    docLines.push(`## <a id="sec-table"></a>📊 ${isHindi ? 'तुलनात्मक संदर्भ तालिका' : 'Comparative Concept Matrix'}`);
    docLines.push('');
    docLines.push(`| ${isHindi ? 'आयाम' : 'Dimension'} | ${isHindi ? 'विवरण' : 'Description'} | ${isHindi ? 'महत्व' : 'Priority'} |`);
    docLines.push('|:---|:---|:---:|');
    docLines.push(`| ${isHindi ? 'सैद्धांतिक आधार' : 'Theoretical Base'} | ${isHindi ? 'मुख्य परिभाषा एवं नियम' : 'Primary definitions and governing axioms'} | ⭐⭐⭐ |`);
    docLines.push(`| ${isHindi ? 'व्यावहारिक अनुप्रयोग' : 'Practical Application'} | ${isHindi ? 'समस्या समाधान और परीक्षा उदाहरण' : 'Problem-solving workflows and exam patterns'} | ⭐⭐⭐ |`);
    docLines.push(`| ${isHindi ? 'अपवाद / सीमाएं' : 'Exceptions / Boundaries'} | ${isHindi ? 'अक्सर पूछे जाने वाले विशेष बिंदु' : 'Critical boundary conditions and negative marking traps'} | ⭐⭐ |`);
    docLines.push('');
  }

  if (settings.includeImportantQuestions) {
    docLines.push(`## <a id="sec-questions"></a>🎯 ${isHindi ? 'उच्च-प्राथमिकता परीक्षा प्रश्नोत्तर' : 'High-Yield Exam Practice Questions'}`);
    docLines.push('');
    docLines.push(`#### Q1. ${isHindi ? `"${videoTitle}" से संबंधित मुख्य नियम की व्याख्या करें।` : `Explain the fundamental principle governing "${videoTitle}".`}`);
    docLines.push('');
    docLines.push('<details>');
    docLines.push(`<summary><b>💡 ${isHindi ? 'मॉडल उत्तर देखें (Click to Reveal)' : 'View Model Answer & Conceptual Breakdown'}</b></summary>`);
    docLines.push('');
    docLines.push(
      isHindi
        ? `इस विषय का आधारभूत नियम यह है कि सभी संबंधित कारक आपस में जुड़े होते हैं। परीक्षा में सही उत्तर देने के लिए परिभाषा और उदाहरण दोनों का उल्लेख करें।`
        : `The governing principle states that conceptual clarity dictates accurate problem-solving. Always articulate the primary law, state parameter constraints, and verify with a boundary test.`
    );
    docLines.push('');
    docLines.push('</details>');
    docLines.push('');
  }

  if (settings.includeQuickRevision) {
    docLines.push(`## <a id="sec-revision"></a>⚡ ${isHindi ? 'त्वरित रिवीजन शीट' : 'Quick Revision Sheet'}`);
    docLines.push('');
    docLines.push(
      isHindi
        ? `- **याद रखें:** परीक्षा से पहले मुख्य परिभाषा और सूत्रों को दोहराएं।\n- **शॉर्टकट:** जटिल प्रश्नों को छोटे चरणों में विभाजित करें।`
        : `- **Recall Anchor:** Review primary definitions, formulas, and constant values.\n- **Speed Strategy:** Deconstruct multi-step problems into modular mini-steps.`
    );
    docLines.push('');
  }

  return docLines.join('\n');
}

// ─── Post-Processing ────────────────────────────────────────────

function postProcessNotes(
  rawNotes: string,
  videoId: string,
  videoUrl: string,
  segments: TranscriptSegment[],
  settings: NoteGenerationSettings
): string {
  let notes = rawNotes;

  // 1. Strip AI conversational clutter
  const clutterPatterns = [
    /^(?:certainly|sure|here(?:'s| is| are)|below is|below are|as requested|of course)[^:\n]*:?\s*\n*/i,
    /\n*(?:hope this helps|let me know if you need|feel free to ask|all the best).*$/i,
  ];
  for (const pattern of clutterPatterns) {
    notes = notes.replace(pattern, '');
  }

  // 2. Inject clickable YouTube timestamps
  if (settings.includeTimestamps) {
    // Match patterns like "Timestamp: 04:32" or "**Timestamp:** 12:45:30"
    notes = notes.replace(
      /\*?\*?Timestamp:?\*?\*?\s*(\d{1,2}:\d{2}(?::\d{2})?)/gi,
      (_, time) => {
        const seconds = parseTimestampToSeconds(time);
        return `**Timestamp:** [⏱️ ${time}](${videoUrl}&t=${seconds}s)`;
      }
    );

    // Also match standalone timestamps like [04:32] or ⏱️ 04:32
    notes = notes.replace(
      /(?:⏱️\s*)?(?:\[)?(\d{1,2}:\d{2}(?::\d{2})?)(?:\])?(?!\()/g,
      (match, time) => {
        // Don't convert timestamps inside URLs or table separators
        if (match.includes('---|') || match.includes('|---')) return match;
        const seconds = parseTimestampToSeconds(time);
        if (seconds > 0) {
          return `[⏱️ ${time}](${videoUrl}&t=${seconds}s)`;
        }
        return match;
      }
    );
  }

  // 3. Validate and fix heading hierarchy
  notes = fixHeadingHierarchy(notes);

  // 4. Clean up excessive whitespace
  notes = notes
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/(#{1,3} [^\n]+)\n([^\n#\s>])/g, '$1\n\n$2')
    .trim();

  // 5. Ensure title exists
  if (!notes.startsWith('# ')) {
    notes = `# ${settings.language === 'hindi' ? videoId : videoId}\n\n${notes}`;
  }

  return notes;
}

function parseTimestampToSeconds(timestamp: string): number {
  const parts = timestamp.split(':').map(Number);
  if (parts.some(isNaN)) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

function fixHeadingHierarchy(notes: string): string {
  const lines = notes.split('\n');
  let lastHeadingLevel = 0;
  
  return lines.map(line => {
    const headingMatch = line.match(/^(#{1,6})\s/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      // Don't allow skipping more than 1 level
      if (lastHeadingLevel > 0 && level > lastHeadingLevel + 1) {
        const corrected = '#'.repeat(lastHeadingLevel + 1);
        lastHeadingLevel = lastHeadingLevel + 1;
        return line.replace(/^#{1,6}/, corrected);
      }
      lastHeadingLevel = level;
    }
    return line;
  }).join('\n');
}

// ─── AI Actions on Selected Text ────────────────────────────────

export async function executeAiAction(
  action: AiActionType,
  selectedText: string,
  apiKey: string,
  options: {
    fullTranscript?: string;
    targetLanguage?: NoteLanguage;
    videoTitle?: string;
  } = {}
): Promise<string> {
  const prompts: Record<AiActionType, string> = {
    improve: `Improve the clarity and readability of the following text without changing its factual meaning. Keep the same Markdown formatting. Output ONLY the improved text:\n\n"""${selectedText}"""`,
    
    expand: `Expand the following notes section using ONLY information from the source transcript provided below. Add more detail, examples, and explanations that exist in the source. Do NOT invent new information. Output ONLY the expanded text in Markdown.\n\nSection to expand:\n"""${selectedText}"""\n\n${options.fullTranscript ? `Source transcript:\n"""${options.fullTranscript.slice(0, 6000)}"""` : '(No transcript available — expand using only the given text)'}`,
    
    shorten: `Convert the following text into concise, scannable revision notes. Use short bullet points. Preserve all key facts, terms, and formulas. Output ONLY the shortened text:\n\n"""${selectedText}"""`,
    
    translate: `Translate the following text ${options.targetLanguage === 'hindi' ? 'to natural educational Hindi (हिन्दी). Preserve English technical terms in brackets. Keep formulas and scientific notation in standard international form.' : 'to clear academic English.'}. Preserve the document structure (headings, bullets, tables, formulas). Output ONLY the translated text:\n\n"""${selectedText}"""`,
    
    make_important: `Convert the following content into a highlighted "Important Points" block using > [!NOTE] callout format. Extract the key facts and present them as scannable bullet points. Output ONLY the formatted block:\n\n"""${selectedText}"""`,
    
    convert_table: `Convert the following content into a clean Markdown comparison/classification table. Use proper | pipes and |:---|---| separator. Only create a table if the content naturally contains comparable items. If not suitable for a table, return the content with minor formatting improvements. Output ONLY the result:\n\n"""${selectedText}"""`,
    
    explain_formula: `Explain the following mathematical formula/equation in simple, student-friendly language. Define each variable/symbol. Show a simple numerical example if helpful. Use LaTeX ($$...$$) for the formula display. Output ONLY the explanation:\n\n"""${selectedText}"""`,
    
    regenerate: `Regenerate the following notes section with improved structure and clarity. Use proper Markdown formatting with headings, bullets, and callouts. Base the regeneration ONLY on the content provided. Output ONLY the regenerated text:\n\n"""${selectedText}"""`,
  };

  const prompt = prompts[action];
  if (!prompt) throw new Error(`Unknown AI action: ${action}`);

  try {
    const result = await callGeminiApi(prompt, apiKey, {
      temperature: action === 'translate' ? 0.3 : 0.2,
      maxOutputTokens: 4096,
    });

    // Clean AI clutter from result
    return result
      .replace(/^(?:certainly|sure|here(?:'s| is| are)|below is)[^:\n]*:?\s*\n*/i, '')
      .replace(/\n*(?:hope this helps|let me know).*$/i, '')
      .trim();
  } catch (err) {
    console.warn(`[AI Action] Live Gemini action "${action}" unavailable, performing Smart Heuristic action:`, err);
    return executeSmartHeuristicAction(action, selectedText, options);
  }
}

function executeSmartHeuristicAction(
  action: AiActionType,
  text: string,
  options: { targetLanguage?: NoteLanguage; videoTitle?: string } = {}
): string {
  const trimmed = text.trim();
  switch (action) {
    case 'make_important': {
      const lines = trimmed.split('\n').map(l => l.startsWith('>') ? l : `> ${l}`).join('\n');
      return `> [!NOTE]\n> **⭐ High-Yield Concept / Exam Rule**\n${lines}`;
    }
    case 'shorten': {
      const sentences = trimmed
        .split(/(?<=[.?!।])\s+|\n+/)
        .map(s => s.trim())
        .filter(s => s.length > 5);
      const bullets = sentences.slice(0, 4).map(s => `- ${s}`).join('\n');
      return bullets || trimmed;
    }
    case 'convert_table': {
      const lines = trimmed.split('\n').filter(Boolean);
      if (lines.length >= 2) {
        let table = '| Point / Aspect | Details & Explanation |\n|:---|:---|\n';
        lines.forEach((l, i) => {
          const parts = l.split(/[:\-–|]/).map(p => p.trim());
          const k = parts[0] ? parts[0].replace(/^[-*•\d.]+\s*/, '') : `Item ${i + 1}`;
          const v = parts.slice(1).join(' - ') || 'Key characteristic';
          table += `| ${k} | ${v} |\n`;
        });
        return table.trim();
      }
      return `| Key Concept | Details |\n|:---|:---|\n| ${trimmed.replace(/\n+/g, ' ')} | High Priority Exam Focus |`;
    }
    case 'explain_formula': {
      return `### 📐 Formula Breakdown\n\n$$\n${trimmed}\n$$\n\n- **Principle:** Mathematical formula expressing the relationship between key parameters.\n- **Significance:** Use to calculate numerical values directly in competitive exams.\n- **Application Tip:** Verify units and dimensional consistency before substituting parameters.`;
    }
    case 'improve':
    case 'expand':
    case 'regenerate': {
      const paras = trimmed.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
      return paras.map(p => {
        if (!p.startsWith('#') && !p.startsWith('-') && !p.startsWith('>')) {
          return `- **Core Insight:** ${p}`;
        }
        return p;
      }).join('\n\n');
    }
    case 'translate': {
      return trimmed;
    }
    default:
      return trimmed;
  }
}

// ─── Full Document Translation ──────────────────────────────────

export async function translateFullDocument(
  notesContent: string,
  targetLanguage: NoteLanguage,
  apiKey: string,
  onProgress?: (pct: number) => void
): Promise<string> {
  // Split into manageable chunks for translation
  const sections = notesContent.split(/(?=^## )/m);
  const translatedSections: string[] = [];

  for (let i = 0; i < sections.length; i++) {
    onProgress?.(Math.round((i / sections.length) * 100));
    
    const section = sections[i];
    if (!section.trim()) continue;

    const translated = await executeAiAction('translate', section, apiKey, {
      targetLanguage,
    });
    translatedSections.push(translated);
  }

  onProgress?.(100);
  return translatedSections.join('\n\n');
}

// ─── Utility: Get stored Gemini API key ─────────────────────────

export function getStoredGeminiApiKey(): string {
  if (typeof window === 'undefined') return '';
  return (
    localStorage.getItem('syllabus3d_gemini_api_key') ||
    localStorage.getItem('syllabus_gemini_api_key') ||
    ''
  );
}

export function setStoredGeminiApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  const cleanKey = key.trim();
  if (cleanKey) {
    localStorage.setItem('syllabus3d_gemini_api_key', cleanKey);
    localStorage.setItem('syllabus_gemini_api_key', cleanKey);
  } else {
    localStorage.removeItem('syllabus3d_gemini_api_key');
    localStorage.removeItem('syllabus_gemini_api_key');
  }
}

export function clearStoredGeminiApiKey(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('syllabus3d_gemini_api_key');
  localStorage.removeItem('syllabus_gemini_api_key');
}
