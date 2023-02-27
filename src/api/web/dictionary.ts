import axios from 'axios';
import type { DictionaryStruct, WordResult } from '../../types/dictionary';


export async function fetchWord(word: string): Promise<WordResult[]> {
  const res: DictionaryStruct = await axios.post('/api/dictionary', {
    word
  }, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  if (!res.data.results) {
    return [];
  }
  return res.data.results;
}
