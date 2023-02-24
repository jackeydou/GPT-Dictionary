import { useState } from "react";
import { openAIWordConversationApi } from './api/openai';
import { fetchWord } from './api/dictionary';
import Loading from './components/loading';
import WordDetail from './components/word_detail';
import BuyMeACoffee from './components/buymeacoffee';
import { WordResult } from "./types/dictionary";

function App() {
  const [word, setWord] = useState("");
  const [previousWord, setPreviousWord] = useState("");
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
  const search = async () => {
    if(word === previousWord) {
      return;
    }
    setLoading(true);
    await fetchWordDefination();
    setPreviousWord(word);
    setLoading(false);
    await fetchConversation();
  }

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center py-2 min-h-screen">
      <BuyMeACoffee />
      <div className="mt-60 transition-all duration-400" style={wordDefination.length > 0 ? { marginTop: 0 } : {}}>
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
      <div className="max-w-2xl w-full rounded-xl border shadow-md p-4 transition-opacity duration-300 delay-200 ease-in-out" style={{opacity: wordDefination.length > 0 ? 1 : 0}}>
        <p className="sm:text-xl text-xl max-w-2xl text-slate-900">
          The defination of
          <i className="font-bold"> {previousWord}</i>
        </p>
        <div className="divide-y">
          {
            wordDefination.map((it, idx) => (<WordDetail word={it} key={it.id + idx} />))
          }
        </div>
      </div>
      <div className="max-w-2xl w-full rounded-xl border shadow-md p-4 hover:bg-gray-50 transition-opacity duration-300 delay-300 mt-4 ease-in-out" style={{opacity: wordDefination.length > 0 ? 1 : 0}}>
        <p className="sm:text-xl text-xl max-w-2xl text-slate-900">
          The usage of
          <i className="font-bold"> {previousWord}</i>
        </p>
        {conversation.length > 0 ? ( <div className="max-w-2xl w-full p-4">
          {conversation.map((c, i) => {
            return (<p key={i} className="leading-7">{c}</p>)
          })}
        </div>) : <div className="w-full flex justify-center"><Loading color="#000" style=""/></div>}
       
      </div>
    </div>
  );
}

export default App;
