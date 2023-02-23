import { WordResult } from "../../types/dictionary"
import SpeakerWaveIcon from '@heroicons/react/20/solid/SpeakerWaveIcon';

interface IProps {
  word: WordResult;
}

export default function WordDetail(props: IProps) {
  const { word } = props;
  const { lexicalEntries } = word;
  return (
    <div className="w-full py-2">
      {lexicalEntries.map((entry, idx) => {
        return (
          <div key={entry?.lexicalCategory?.id + idx} className="py-2 px-2 cursor-pointer transition-colors hover:bg-gray-50 rounded-md">
            <div className="flex items-center">
              <div className="px-2 py-1 rounded-full bg-teal-100 mr-2">{entry.lexicalCategory?.id}</div>
              <div>
                {entry.entries?.map((it, idx) => {
                  return (
                    <div key={idx}>
                      {it.pronunciations?.map((pronunciation, index) => (<div className="flex items-center" key={pronunciation?.phoneticNotation + index}><SpeakerWaveIcon className="h-4 w-4 text-gray-500 mr-1"/>/ {pronunciation.phoneticSpelling} /</div>))}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="py-2">
              {entry.entries?.map((it, idx) => {
                return (
                  <ul key={idx} className="list-disc pl-6">
                    {it.senses?.map(sense => (<li>{sense?.definitions?.[0]}</li>))}
                  </ul>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}