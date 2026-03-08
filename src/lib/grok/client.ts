const GROK_API_URL = "https://api.x.ai/v1/chat/completions";

export async function queryGrok(prompt: string): Promise<string> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    throw new Error("XAI_API_KEY not configured");
  }

  const response = await fetch(GROK_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-3",
      messages: [
        {
          role: "system",
          content:
            "You are a sports data assistant. Return NCAA March Madness tournament scores in the exact JSON format requested. Use your search capability to find the most current scores. Return ONLY valid JSON, no markdown or explanations.",
        },
        { role: "user", content: prompt },
      ],
      search_mode: "auto",
    }),
  });

  if (!response.ok) {
    throw new Error(`Grok API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
