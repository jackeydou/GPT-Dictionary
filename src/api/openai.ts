import { Body } from "@tauri-apps/api/http";
import { singletonClient } from './client';

export const OPEN_AI_HOST = "https://api.openai.com";

export const OPEN_AI_KEY = import.meta.env.VITE_OPEN_AI_KEY;

export async function openAIWordConversationApi(
  prompt: string,
) {
  if (!OPEN_AI_KEY) {
    throw new Error("Missing OpenAI OPEN_AI_KEY");
  }
  const url = `${OPEN_AI_HOST}/v1/completions`;
  const body = Body.json({
    model: "text-davinci-003",
    // prompt: getVariblePrompt(prompt, convention),
    max_tokens: 100,
    temperature: 0,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: "$$",
  });
  const response = await (await singletonClient()).post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPEN_AI_KEY}`,
    },
  });
  const { data } = response;

  return data;
}
