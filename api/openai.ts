export const config = {
  runtime: 'edge'
}

export default async function handler(request: Request): Promise<Response> {
  const { prompt } = (await request.json()) as {
    prompt: string
  };

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: prompt,
    }],
    // model: "text-davinci-003",
    // max_tokens: 200,
    // temperature: 0,
    // prompt,
    // top_p: 1,
    // n: 1,
    // stream: false,
    // logprobs: null,
    // stop: "$$",
  };

  return await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VITE_OPEN_AI_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload)
  });
}