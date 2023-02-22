export interface OpenAIResponse {
  id: string; // e.g. "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7";
  object: string; // e.g. "text_completion";
  created: Number;
  model: string; // e.g. "text-davinci-003";
  choices: [
    {
      text: string; // result
      index: number;
      logprobs: unknown;
      finish_reason: string; // e.g. "length";
    }
  ];
  usage: {
    prompt_tokens: number; // 5;
    completion_tokens: number; // 7;
    total_tokens: number; // 12;
  };
}