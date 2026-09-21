import { describe, it, expect } from 'vitest';
import { calculateSectionMetrics, getPerformanceStatus } from './mockCalculations';
import { calculateOverallKPIs, calculateSubjectStats } from './mockAnalyticsEngine';
import { diagnoseWeakSections, generatePerformanceInsights } from './mockFeedbackEngine';
import { MockTest } from '../types/mockTracker';

describe('Mock Percentile Tracker Calculations Engine', () => {
  it('correctly calculates section metrics with positive marks and negative penalty', () => {
    const metrics = calculateSectionMetrics(25, 20, 3, 2, 0.5);
    expect(metrics.attempted).toBe(23);
    expect(metrics.unattempted).toBe(2);
    expect(metrics.accuracy).toBeCloseTo((20 / 23) * 100, 1);
    expect(metrics.score).toBe(38.5); // 20*2 - 3*0.5 = 40 - 1.5 = 38.5
    expect(metrics.maxMarks).toBe(50);
  });

  it('determines performance status correctly based on accuracy and attempt rate', () => {
    expect(getPerformanceStatus(92, 90)).toBe('Mastered');
    expect(getPerformanceStatus(82, 80)).toBe('Strong');
    expect(getPerformanceStatus(72, 65)).toBe('Average');
    expect(getPerformanceStatus(58, 50)).toBe('Needs Improvement');
    expect(getPerformanceStatus(40, 30)).toBe('Critical');
  });

  it('calculates overall KPIs across a set of mock tests', () => {
    const sampleMock: MockTest = {
      id: 'test-1',
      testName: 'CGL Tier 1 Mock #1',
      date: '2026-03-15',
      testPlatform: 'Testbook',
      exam: 'SSC CGL',
      tier: 'Tier 1',
      mockType: 'FULL_LENGTH',
      totalQuestions: 100,
      attempted: 85,
      correct: 75,
      wrong: 10,
      unattempted: 15,
      accuracy: 88.2,
      score: 145,
      maxMarks: 200,
      percentile: 94.5,
      cutoffMarks: 135,
      isClearedCutoff: true,
      timeTakenMinutes: 58,
      totalTimeMinutes: 60,
      createdAt: Date.now(),
      negativeMarks: 5,
      attemptRate: 85,
      weakAreas: ['Geometry'],
      sections: [
        {
          id: 'sec-1',
          mockId: 'test-1',
          sectionName: 'Quantitative Aptitude',
          totalQuestions: 25,
          attempted: 22,
          correct: 20,
          wrong: 2,
          unattempted: 3,
          accuracy: 90.9,
          score: 39,
          maxMarks: 50,
          timeTakenMinutes: 20,
          status: 'Mastered'
        }
      ]
    };

    const kpis = calculateOverallKPIs([sampleMock]);
    expect(kpis.totalMocks).toBe(1);
    expect(kpis.averageScore).toBe(145);
    expect(kpis.bestScore).toBe(145);
    expect(kpis.averagePercentile).toBe(94.5);
    expect(kpis.fullLengthCutoffRate).toBe(100);

    const subStats = calculateSubjectStats([sampleMock]);
    expect(subStats.length).toBeGreaterThan(0);
    expect(subStats[0].sectionName).toBe('Quantitative Aptitude');

    const diagnoses = diagnoseWeakSections([sampleMock]);
    expect(Array.isArray(diagnoses)).toBe(true);

    const insights = generatePerformanceInsights([sampleMock]);
    expect(insights.length).toBeGreaterThan(0);
  });
});
