import { singletonClient } from './client';
import type { DictionaryStruct, WordResult, WordStruct } from '../types/dictionary';

export const DICTIONARY_HOST = 'https://od-api.oxforddictionaries.com';

export const PATH = '/api/v2/entries/en-gb/';

export const APP_ID = import.meta.env.VITE_APP_ID;

export const APP_KEY = import.meta.env.VITE_APP_KEY;

export const WORD_FIELDS = "definitions,examples,pronunciations";

// export const mockData = JSON.parse("{\"url\":\"https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/Ace?fields=definitions,examples,pronunciations&strictMatch=false\",\"status\":200,\"ok\":true,\"headers\":{\"api_version\":\"v2\",\"code_version\":\"gd45bf95\",\"connection\":\"close\",\"content-length\":\"13681\",\"content-type\":\"application/json;charset=utf-8\",\"date\":\"Mon, 13 Feb 2023 09:51:13 GMT\",\"server\":\"openresty\",\"x-request-id\":\"1-63ea0811-4b9027e135049c4c0205e026\"},\"rawHeaders\":{\"api_version\":[\"v2\"],\"code_version\":[\"gd45bf95\"],\"connection\":[\"close\"],\"content-length\":[\"13681\"],\"content-type\":[\"application/json;charset=utf-8\"],\"date\":[\"Mon, 13 Feb 2023 09:51:13 GMT\"],\"server\":[\"openresty\"],\"x-request-id\":[\"1-63ea0811-4b9027e135049c4c0205e026\"]},\"data\":{\"id\":\"ace\",\"metadata\":{\"operation\":\"retrieve\",\"provider\":\"Oxford University Press\",\"schema\":\"RetrieveEntry\"},\"results\":[{\"id\":\"ace\",\"language\":\"en-gb\",\"lexicalEntries\":[{\"entries\":[{\"homographNumber\":\"100\",\"pronunciations\":[{\"audioFile\":\"https://audio.oxforddictionaries.com/en/mp3/ace__gb_3.mp3\",\"dialects\":[\"British English\"],\"phoneticNotation\":\"IPA\",\"phoneticSpelling\":\"eɪs\"}],\"senses\":[{\"definitions\":[\"a playing card with a single spot on it, ranked as the highest card in its suit in most card games\"],\"examples\":[{\"text\":\"the ace of diamonds\"},{\"text\":\"life had started dealing him aces again\"}],\"id\":\"m_en_gbus0005680.006\"},{\"definitions\":[\"a person who excels at a particular sport or other activity\"],\"examples\":[{\"text\":\"a motorcycle ace\"}],\"id\":\"m_en_gbus0005680.010\",\"subsenses\":[{\"definitions\":[\"a pilot who has shot down many enemy aircraft\"],\"examples\":[{\"text\":\"a Battle of Britain ace\"}],\"id\":\"m_en_gbus0005680.011\"}]},{\"definitions\":[\"(in tennis and similar games) a service that an opponent is unable to return and thus wins a point\"],\"examples\":[{\"text\":\"Nadal banged down eight aces in the set\"}],\"id\":\"m_en_gbus0005680.013\",\"subsenses\":[{\"definitions\":[\"a hole in one\"],\"examples\":[{\"text\":\"his hole in one at the 15th was Senior's second ace as a professional\"}],\"id\":\"m_en_gbus0005680.014\"}]}]}],\"language\":\"en-gb\",\"lexicalCategory\":{\"id\":\"noun\",\"text\":\"Noun\"},\"text\":\"ace\"},{\"entries\":[{\"homographNumber\":\"101\",\"pronunciations\":[{\"audioFile\":\"https://audio.oxforddictionaries.com/en/mp3/ace__gb_3.mp3\",\"dialects\":[\"British English\"],\"phoneticNotation\":\"IPA\",\"phoneticSpelling\":\"eɪs\"}],\"senses\":[{\"definitions\":[\"very good\"],\"examples\":[{\"text\":\"an ace swimmer\"},{\"text\":\"Ace! You've done it!\"}],\"id\":\"m_en_gbus0005680.016\"}]}],\"language\":\"en-gb\",\"lexicalCategory\":{\"id\":\"adjective\",\"text\":\"Adjective\"},\"text\":\"ace\"},{\"entries\":[{\"homographNumber\":\"102\",\"pronunciations\":[{\"audioFile\":\"https://audio.oxforddictionaries.com/en/mp3/ace__gb_3.mp3\",\"dialects\":[\"British English\"],\"phoneticNotation\":\"IPA\",\"phoneticSpelling\":\"eɪs\"}],\"senses\":[{\"definitions\":[\"(in tennis and similar games) serve an ace against (an opponent)\"],\"examples\":[{\"text\":\"he can ace opponents with serves of no more than 62 mph\"}],\"id\":\"m_en_gbus0005680.020\",\"subsenses\":[{\"definitions\":[\"score an ace on (a hole) or with (a shot)\"],\"examples\":[{\"text\":\"there was a prize for the first player to ace the hole\"}],\"id\":\"m_en_gbus0005680.026\"}]},{\"definitions\":[\"achieve high marks in (a test or exam)\"],\"examples\":[{\"text\":\"I aced my grammar test\"}],\"id\":\"m_en_gbus0005680.028\",\"subsenses\":[{\"definitions\":[\"outdo someone in a competitive situation\"],\"examples\":[{\"text\":\"the magazine won an award, acing out its rivals\"}],\"id\":\"m_en_gbus0005680.029\"}]}]}],\"language\":\"en-gb\",\"lexicalCategory\":{\"id\":\"verb\",\"text\":\"Verb\"},\"text\":\"ace\"}],\"type\":\"headword\",\"word\":\"ace\"},{\"id\":\"ace\",\"language\":\"en-gb\",\"lexicalEntries\":[{\"entries\":[{\"homographNumber\":\"200\",\"pronunciations\":[{\"audioFile\":\"https://audio.oxforddictionaries.com/en/mp3/ace__gb_3.mp3\",\"dialects\":[\"British English\"],\"phoneticNotation\":\"IPA\",\"phoneticSpelling\":\"eɪs\"}],\"senses\":[{\"definitions\":[\"an asexual person\"],\"examples\":[{\"text\":\"both asexual, they have managed to connect with other aces offline\"}],\"id\":\"m_en_gbus1190638.004\"}]}],\"language\":\"en-gb\",\"lexicalCategory\":{\"id\":\"noun\",\"text\":\"Noun\"},\"text\":\"ace\"},{\"entries\":[{\"homographNumber\":\"201\",\"pronunciations\":[{\"audioFile\":\"https://audio.oxforddictionaries.com/en/mp3/ace__gb_3.mp3\",\"dialects\":[\"British English\"],\"phoneticNotation\":\"IPA\",\"phoneticSpelling\":\"eɪs\"}],\"senses\":[{\"definitions\":[\"(of a person) asexual\"],\"examples\":[{\"text\":\"I didn't realize that I was ace for a long time\"}],\"id\":\"m_en_gbus1190638.006\"}]}],\"language\":\"en-gb\",\"lexicalCategory\":{\"id\":\"adjective\",\"text\":\"Adjective\"},\"text\":\"ace\"}],\"type\":\"headword\",\"word\":\"ace\"}],\"word\":\"ace\"}}");

function getOxfordDictionaryUrl(word: string) {
  const host = 'https://od-api.oxforddictionaries.com';
  const path = '/api/v2/entries/en-gb/';
  const query = 'fields=definitions,examples,pronunciations&strictMatch=false';
  return `${host}${path}${word}?${query}`;
}

export async function fetchWord(word: string): Promise<WordResult[]> {
  const res: DictionaryStruct = await (await singletonClient()).get(getOxfordDictionaryUrl(word), {
    headers: {
      'app_id': APP_ID,
      'app_key': APP_KEY,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  if (!res.ok) {
    return [];
  }
  // const res = Promise.resolve(mockData as DictionaryStruct);
  console.log('ace: ', res.data)
  return res.data.results;
}
