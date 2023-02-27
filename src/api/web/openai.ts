import axios from 'axios';
import { removeNewlines } from '../../utils';
import type { OpenAIResponse } from '../../types/openai';

export const OPEN_AI_HOST = "https://api.openai.com";


function getConversationPrompt(word: string) {
  return `Using the word: ${word}, generate daily and work conversations between Alice and Bob, reflecting the way the word is commonly used, with a '-' symbol in front of Alice and Bob's names to distinguish them$$`;
}

export async function openAIWordConversationApi(
  word: string,
) {

  const response = await axios.post<OpenAIResponse>('/api/openai', {
    prompt: getConversationPrompt(word),
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = response;
  const result = removeNewlines(data.choices?.[0].text)?.split('-').filter(it => Boolean(it));
  return result;
}
