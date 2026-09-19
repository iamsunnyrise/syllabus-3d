/**
 * Lightweight dynamic-import celebration helper.
 * Keeps canvas-confetti out of the initial application startup bundle,
 * loading it strictly on-demand when celebrations occur.
 */
export async function fireCelebration(options?: any): Promise<void> {
  try {
    const confetti = (await import('canvas-confetti')).default;
    confetti(options);
  } catch (err) {
    console.warn('Could not load celebration confetti:', err);
  }
}
