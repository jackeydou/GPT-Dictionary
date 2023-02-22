import { useState } from "react";
import { openAIWordConversationApi } from './api/openai';
import { fetchWord } from './api/dictionary';
import Loading from './components/loading';
import WordDetail from './components/word_detail';
import { WordResult } from "./types/dictionary";

function App() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordDefination, setWordDefination] = useState<WordResult[]>([]);
  const [conversation, setConversation] = useState<string[]>([]);

  const fetchWordDefination = async () => {
    const result = await fetchWord(word);
    setWordDefination(result);
  }

  const fetchConversation = async () => {
    setConversation(await openAIWordConversationApi(word));
  }
  const search = () => {
    fetchWordDefination();
  }

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <div className="row">
        <input
          id="greet-input"
          onChange={(e) => setWord(e.currentTarget.value)}
          placeholder="Enter a word..."
          className="rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 py-2 px-3 outline-none"
        />
        <button 
          type="submit" 
          className="ml-4 bg-black rounded-md text-white font-medium px-4 py-2 hover:bg-black/80"
          onClick={search}
        >
          {!loading ? <span>Search</span> : <Loading color="#fff" style="normal" /> }
        </button>
      </div>
      {wordDefination.length > 0 && <div className="max-w-2xl w-full rounded-xl border shadow-md p-4">
        <p className="sm:text-xl text-xl max-w-2xl text-slate-900">
          The defination of
          <i className="font-bold"> {word}</i>
        </p>
        <div className="divide-y">
          {
            wordDefination.map(it => (<WordDetail word={it} />))
          }
        </div>
      </div>}
      {conversation.length > 0 && (
        <div className="max-w-2xl w-full rounded-xl border shadow-md p-4">
          <p className="sm:text-xl text-xl max-w-2xl text-slate-900">
            The usage of
            <i className="font-bold"> {word}</i>
          </p>
          <div className="max-w-2xl w-full rounded-xl border shadow-md p-4 hover:bg-gray-100 transition">
            {conversation.map((c, i) => {
              return (<p key={i}>{c}</p>)
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
