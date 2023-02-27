import axios from 'axios';
import type { DictionaryStruct, WordResult } from '../../types/dictionary';

export const DICTIONARY_HOST = 'https://od-api.oxforddictionaries.com';

export const PATH = '/api/v2/entries/en-gb/';

export const WORD_FIELDS = "definitions,examples,pronunciations";

export async function fetchWord(word: string): Promise<WordResult[]> {
  const res: DictionaryStruct = await axios.post('/api/dictionary', {
    word
  }, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  if (!res.ok) {
    return [];
  }
  return res.data.results;
}
