/**
 * Vercel Serverless Function: Gemini AI Proxy
 * Enables seamless, 1-click note generation for all users using
 * Google's latest gemini-3.6-flash / gemini-2.5 models without
 * exposing private keys on the client or requiring users to configure API keys.
 */

export default async function handler(req: any, res: any) {
  // Allow CORS for local dev / preview environments
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured in server environment variables.',
      code: 'NO_SERVER_KEY'
    });
  }

  const { prompt, videoUrl, temperature = 0.25, maxOutputTokens = 8192 } = req.body || {};

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "prompt" parameter.' });
  }

  // Google's latest model hierarchy
  const candidateModels = [
    'gemini-3.6-flash',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.5-pro'
  ];

  const payloadWithVideo = videoUrl
    ? {
        contents: [
          {
            parts: [
              { file_data: { file_uri: videoUrl } },
              { text: prompt }
            ]
          }
        ],
        generationConfig: { temperature, maxOutputTokens }
      }
    : null;

  const payloadTextOnly = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature, maxOutputTokens }
  };

  let lastError = '';

  for (const model of candidateModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = payloadWithVideo || payloadTextOnly;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim()) {
          return res.status(200).json({ text: text.trim(), model });
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        lastError = errorData?.error?.message || `Model ${model} returned HTTP ${response.status}`;
      }
    } catch (err: any) {
      lastError = err?.message || `Network error with model ${model}`;
    }
  }

  return res.status(502).json({ error: lastError || 'All Gemini candidate models failed.' });
}
