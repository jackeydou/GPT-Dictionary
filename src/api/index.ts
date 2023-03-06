import type { WordResult } from '../types/dictionary';

export { openAIWordConversationApi } from './web/openai';

export async function fetchWord(word: string): Promise<WordResult[]> {
  let fetcher;
  if (IS_WEB) {
    fetcher = await (await import('./web/dictionary')).fetchWord;
  } else {
    fetcher = await (await import('./client/dictionary')).fetchWord;
  }
  return fetcher(word);
}
