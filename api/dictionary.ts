export const config = {
  runtime: 'edge'
}

export default async function handler(request: Request): Promise<Response> {
  const { word } = (await request.json()) as {
    word: string
  };

  return await fetch(`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?fields=definitions,examples,pronunciations&strictMatch=false`, {
    headers: {
      'app_id': `${process.env.VITE_APP_ID}`,
      'app_key': `${process.env.VITE_APP_KEY}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    method: "GET",
  });
}