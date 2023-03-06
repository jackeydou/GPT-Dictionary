import { fetchEventSource } from '@microsoft/fetch-event-source';

export const OPEN_AI_HOST = "https://openai.proxyapiiii.xyz";


function getConversationPrompt(word: string) {
  return `Using the word: ${word}, generate daily or work conversations between Alice and Bob, reflecting the way the word is commonly used, add a $$ symbol to the end of each sentence of alice and bob and do not need to emphasize whether it's daily or work, just show the conversation`;
}


let OPEN_AI_KEY = ''; // import.meta.env.VITE_OPEN_AI_KEY;
export function setOpenAIKey(key: string) {
  OPEN_AI_KEY = key;
}


export async function openAIWordConversationApi(
  word: string,
  onmessage: (data: string | null) => void,
) {
  if (!OPEN_AI_KEY) {
    return;
  }
  const url = `${OPEN_AI_HOST}/v1/chat/completions`;
  await fetchEventSource(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPEN_AI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: getConversationPrompt(word),
      }],
      max_tokens: 1000,
      temperature: 0,
      top_p: 1,
      n: 1,
      stream: true,
    }),
    onmessage: (event) => {
      let data: string | null = '';
      if (event.data === "[DONE]") {
        data = null;
      } else {
        try {
          data = JSON.parse(event.data)?.choices?.[0]?.delta?.content ?? '';
        } catch (e) {
          return '';
        }
      }
      onmessage(data);
    },
    onerror(err) {
      console.log("There was an error from server", err);
    },
  });
}

