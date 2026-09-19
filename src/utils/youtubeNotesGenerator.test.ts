import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateSmartOfflineNotes,
  executeAiAction,
  getDefaultNoteSettings,
  getStoredGeminiApiKey,
  setStoredGeminiApiKey,
  clearStoredGeminiApiKey,
  generateYouTubeNotes,
  type NoteGenerationSettings
} from './youtubeNotesGenerator';
import type { TranscriptSegment } from '../services/youtubeTranscriptService';

describe('YouTube Notes Generator & Smart Engine', () => {
  const sampleSegments: TranscriptSegment[] = [
    { text: 'Welcome to this comprehensive lecture on Newton Laws of Motion and Dynamics.', start: 0, duration: 15 },
    { text: 'First law states that an object remains at rest unless acted upon by an external net force.', start: 16, duration: 25 },
    { text: 'Inertia is the fundamental resistance of any physical object to change in velocity.', start: 42, duration: 30 },
    { text: 'Now moving to the second law, Force equals mass multiplied by acceleration: F = m * a.', start: 75, duration: 40 },
    { text: 'The unit of force in SI system is Newton which equals kilogram meter per second squared.', start: 118, duration: 35 },
    { text: 'Third law states that for every action force there is an equal and opposite reaction force.', start: 155, duration: 45 },
    { text: 'In summary, always draw free body diagrams before writing equation of motion for solving exam problems.', start: 205, duration: 35 },
  ];

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('generates rich structured notes with timestamps and TOC from segments', () => {
    const settings: NoteGenerationSettings = getDefaultNoteSettings();
    const notes = generateSmartOfflineNotes({
      videoId: 'test1234',
      videoTitle: 'Newton Laws of Motion Masterclass',
      channelName: 'Physics Wallah',
      videoUrl: 'https://www.youtube.com/watch?v=test1234',
      segments: sampleSegments,
      settings,
    });

    expect(notes).toContain('# Newton Laws of Motion Masterclass');
    expect(notes).toContain('Physics Wallah');
    expect(notes).toContain('Table of Contents');
    expect(notes).toContain('Core Takeaways & Learning Objectives');
    expect(notes).toContain('Chapter-by-Chapter Detailed Notes');
    expect(notes).toContain('[⏱️ 00:00](https://www.youtube.com/watch?v=test1234&t=0s)');
    expect(notes).toContain('Key Concept Matrix');
    expect(notes).toContain('High-Yield Exam Questions & Model Solutions');
    expect(notes).toContain('60-Second Flash Revision Cheat Sheet');
  });

  it('generates Hindi structured notes when settings.language is hindi', () => {
    const settings: NoteGenerationSettings = {
      ...getDefaultNoteSettings(),
      language: 'hindi',
    };
    const notes = generateSmartOfflineNotes({
      videoId: 'test5678',
      videoTitle: 'गति के नियम (Laws of Motion)',
      channelName: 'Drishti IAS',
      videoUrl: 'https://www.youtube.com/watch?v=test5678',
      segments: sampleSegments,
      settings,
    });

    expect(notes).toContain('# गति के नियम (Laws of Motion)');
    expect(notes).toContain('विषय-सूची (Table of Contents)');
    expect(notes).toContain('अध्याय का मुख्य सार (Core Takeaways)');
    expect(notes).toContain('अध्यायवार विस्तृत नोट्स');
    expect(notes).toContain('त्वरित सारांश मैट्रिक्स');
    expect(notes).toContain('महत्वपूर्ण परीक्षा उपयोगी प्रश्नोत्तर');
  });

  it('generates comprehensive study guide when segments are empty', () => {
    const settings: NoteGenerationSettings = getDefaultNoteSettings();
    const notes = generateSmartOfflineNotes({
      videoId: 'empty123',
      videoTitle: 'Quantum Mechanics Overview',
      channelName: 'MIT OpenCourseWare',
      videoUrl: 'https://www.youtube.com/watch?v=empty123',
      segments: [],
      settings,
    });

    expect(notes).toContain('# Quantum Mechanics Overview');
    expect(notes).toContain('Smart Topic Study Architecture');
    expect(notes).toContain('Table of Contents');
    expect(notes).toContain('Foundational Principles');
  });

  it('provides heuristic fallback for executeAiAction when no API key is provided', async () => {
    // 1. make_important
    const importantResult = await executeAiAction(
      'make_important',
      'Acceleration is vector quantity.\nForce is rate of change of momentum.',
      ''
    );
    expect(importantResult).toContain('> [!NOTE]');
    expect(importantResult).toContain('High-Yield Concept');

    // 2. shorten
    const shortenResult = await executeAiAction(
      'shorten',
      'Newton first law defines inertia. Second law defines force quantitatively. Third law establishes reciprocal interactions.',
      ''
    );
    expect(shortenResult).toContain('- ');

    // 3. convert_table
    const tableResult = await executeAiAction(
      'convert_table',
      'Mass: Scalar quantity\nWeight: Vector quantity directed towards center',
      ''
    );
    expect(tableResult).toContain('|');
    expect(tableResult).toContain(':---');

    // 4. explain_formula
    const formulaResult = await executeAiAction('explain_formula', 'F = m * a', '');
    expect(formulaResult).toContain('$$');
    expect(formulaResult).toContain('Formula Breakdown');
  });

  it('manages Gemini API key in localStorage correctly', () => {
    expect(getStoredGeminiApiKey()).toBe('');

    setStoredGeminiApiKey('AIzaSyTest123456789');
    expect(getStoredGeminiApiKey()).toBe('AIzaSyTest123456789');

    clearStoredGeminiApiKey();
    expect(getStoredGeminiApiKey()).toBe('');
  });

  it('generateYouTubeNotes runs seamlessly and completes without errors using offline engine', async () => {
    const progressUpdates: any[] = [];
    const settings = getDefaultNoteSettings();

    const result = await generateYouTubeNotes({
      videoId: 'vid999',
      videoTitle: 'Thermodynamics Crash Course',
      channelName: 'Unacademy',
      videoUrl: 'https://www.youtube.com/watch?v=vid999',
      segments: sampleSegments,
      settings,
      apiKey: '',
      onProgress: (p) => progressUpdates.push(p),
    });

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(100);
    expect(result).toContain('# Thermodynamics Crash Course');
    expect(progressUpdates.length).toBeGreaterThan(0);
    // Final progress stage is complete
    const lastProgress = progressUpdates[progressUpdates.length - 1];
    expect(lastProgress.isComplete).toBe(true);
  });
});
