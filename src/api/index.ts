import type { WordResult } from '../types/dictionary';

export async function openAIWordConversationApi(
  word: string,
) {
  let fetcher;
  if (IS_WEB) {
    fetcher = await (await import('./web/openai')).openAIWordConversationApi;
  } else {
    fetcher = await (await import('./client/openai')).openAIWordConversationApi;
  }
  return fetcher(word);
}

export async function fetchWord(word: string): Promise<WordResult[]> {
  let fetcher;
  if (IS_WEB) {
    fetcher = await (await import('./web/dictionary')).fetchWord;
  } else {
    fetcher = await (await import('./client/dictionary')).fetchWord;
  }
  return fetcher(word);
}
