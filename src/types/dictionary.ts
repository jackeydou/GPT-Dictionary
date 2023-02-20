export interface WordResult {
  id: string; // "ace"
  type: string;
  word: string; // "ace"
  lexicalEntries: LexicalEntries[];
}

export interface LexicalEntries {
  lexicalCategory: {
    id: string; // "noun";
    text: string; // "Noun"
  };
  entries: {
    pronunciations: Pronunciations[];
    senses: Sense[];
  }[];
}

export interface Pronunciations {
  audioFile: string; // url
  phoneticNotation: string; // e.g. IPA
  phoneticSpelling: string; // e.g. "eɪs"
}

export interface Sense {
  definitions: string[];
  examples: {
    text: string;
  }[];
  id: string; // e.g. m_en_gbus0005680.006
}

export interface WordStruct {
  id: string; // "ace"
  results: WordResult[];
}

export interface DictionaryStruct {
  ok: boolean;
  data: WordStruct;
}