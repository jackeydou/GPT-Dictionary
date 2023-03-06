import { useState, useEffect, useRef } from "react";
// import { invoke } from "@tauri-apps/api/tauri";

import { openAIWordConversationApi, fetchWord } from './api';
import { setOpenAIKey } from './api/web/openai';
import Loading from './components/loading';
import WordDetail from './components/word_detail';
import Menu from './components/menu';
import OpenAIKeyModal from './components/openai_key';
import { WordResult } from "./types/dictionary";


function App() {
  const [word, setWord] = useState("");
  const wordRef = useRef("");
  const conversationRef = useRef("");
  const [previousWord, setPreviousWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordDefination, setWordDefination] = useState<WordResult[]>([]);
  const [conversation, setConversation] = useState<string>("");
  const [openaiKeyInfo, setOpenAIKeyInfo] = useState({
    openaiKeyModalVisible: false,
    setOpenaiKeyTipVisible: false,
  });

  const fetchWordDefination = async () => {
    const result = await fetchWord(word);
    setWordDefination(result);
  }

  const fetchConversation = async () => {
    await openAIWordConversationApi(word, (key: string | null) => {
      if (typeof key === 'string') {
        key = key.replace('$$', '<br />');
        conversationRef.current = `${conversationRef.current}${key}`;
        setConversation(conversationRef.current);
      }
    });
  }

  const search = async () => {
    if (openaiKeyInfo.setOpenaiKeyTipVisible && !openaiKeyInfo.openaiKeyModalVisible) {
      setOpenAIKeyInfo({
        ...openaiKeyInfo,
        openaiKeyModalVisible: true
      });
      return;
    }
    if(wordRef.current === previousWord) {
      return;
    }
    setLoading(true);
    try {
      setConversation("");
      conversationRef.current = "";
      await fetchWordDefination();
      setPreviousWord(wordRef.current);
      setLoading(false);
      await fetchConversation();
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    // const shortcutKey = `${KeyboardMap.option}+S`;
    // checkShortcurRegistered(shortcutKey).then(registered => {
    //   if (!registered) {
    //     console.log('register: ', registered)
    //     registerShortcut(shortcutKey, (shortcut) => {
    //       console.log('register: ', shortcut)
    //       if (shortcut === shortcutKey) {
    
    //         invoke("app_focus_and_copy_selection").then(async _ => {
    //           // const text = await readText();
    //           // console.log('get selection: ', text);
    //         })
    //       }
    //     });
    //   }
    // })
    
    const apiKey = localStorage.getItem('openai-api-key');
    if (apiKey) {
      setOpenAIKey(apiKey);
    } else {
      setOpenAIKeyInfo({
        ...openaiKeyInfo,
        setOpenaiKeyTipVisible: true
      })
    }
    document.addEventListener('keyup', (e) => {
      if (e.code === 'Enter' && wordRef.current) {
        search();
      }
    });
    return () => {
      document.removeEventListener('keyup', () => {});
    }
  }, [])

  const onWordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.currentTarget.value;
    setWord(input);
    wordRef.current = input;
  }

  const showOpenAIKeyModal = () => {
    setOpenAIKeyInfo({
      ...openaiKeyInfo,
      openaiKeyModalVisible: true
    })
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center py-2 min-h-screen">
      <Menu />
      <div className="mt-60 transition-all duration-400" style={wordDefination.length > 0 ? { marginTop: 0 } : {}}>
        <input
          id="greet-input"
          onChange={onWordChange}
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
      {openaiKeyInfo.setOpenaiKeyTipVisible && <p className="cursor-pointer underline text-slate-500 hover:text-black" onClick={showOpenAIKeyModal}>Set your own open ai key here</p>}
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
        {conversation.length > 0 ? (<div className="max-w-2xl w-full p-4">
          <p className="leading-7" dangerouslySetInnerHTML={{__html: conversation}}></p>
        </div>) : <div className="w-full flex justify-center"><Loading color="#000" style=""/></div>}
      </div>
      <OpenAIKeyModal 
        isOpen={openaiKeyInfo.openaiKeyModalVisible} 
        closeModal={() => setOpenAIKeyInfo({
          ...openaiKeyInfo,
          openaiKeyModalVisible: false
        })}
        onSave={(key: string) => {
          localStorage.setItem('openai-api-key', key);
          setOpenAIKey(key);
          setOpenAIKeyInfo({
            openaiKeyModalVisible: false,
            setOpenaiKeyTipVisible: false
          })
        }}
      />
    </div>
  );
}

export default App;
