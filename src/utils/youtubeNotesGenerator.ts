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

const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_FALLBACK_MODEL = 'gemini-1.5-flash';
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
  options: { temperature?: number; maxOutputTokens?: number } = {}
): Promise<string> {
  const { temperature = 0.25, maxOutputTokens = 8192 } = options;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature,
      maxOutputTokens,
    },
  };

  // Try primary model
  let endpoint = `${GEMINI_API_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  let response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  // Fallback model
  if (!response.ok) {
    console.warn(`Gemini ${GEMINI_MODEL} failed (${response.status}), trying fallback...`);
    endpoint = `${GEMINI_API_BASE}/${GEMINI_FALLBACK_MODEL}:generateContent?key=${apiKey}`;
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Gemini API responded with status ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Gemini API returned an empty response.');
  }

  return text.trim();
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

  // Stage 1: Transcript processing
  report(1);
  const chunks = segmentTranscriptIntoChunks(segments, 5000);

  // Stage 2: Topic identification
  report(2);
  const systemPrompt = buildSystemPrompt(settings, videoTitle, channelName);

  let rawNotes: string;

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

  // Stage 5: Formatting notes
  report(5);
  let processedNotes = postProcessNotes(rawNotes, videoId, videoUrl, segments, settings);

  // Stage 6: Finalizing document
  report(6);
  processedNotes = repairAllTablesInDocument(processedNotes);

  return processedNotes;
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

  const result = await callGeminiApi(prompt, apiKey, {
    temperature: action === 'translate' ? 0.3 : 0.2,
    maxOutputTokens: 4096,
  });

  // Clean AI clutter from result
  return result
    .replace(/^(?:certainly|sure|here(?:'s| is| are)|below is)[^:\n]*:?\s*\n*/i, '')
    .replace(/\n*(?:hope this helps|let me know).*$/i, '')
    .trim();
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
