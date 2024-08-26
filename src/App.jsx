import { Github, Glasses } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";

export default function App() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState({});
  const [selectedWord, setSelectedWord] = useState("");
  const [sentencesWithWord, setSentencesWithWord] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    setWordCount({});
    setSelectedWord("");
    setSentencesWithWord([]);
  };

  const handleScraping = () => {
    const words = text.split(/[\s,;:"'।!?()\[\]{}]/).filter(Boolean);
    const count = {};

    words.forEach((word) => {
      count[word] = (count[word] || 0) + 1;
    });

    setWordCount(count);
  };

  const handleWordClick = (word) => {
    setSelectedWord(word);
    const sentences = text
      .split(/[।!?]/)
      .filter((sentence) => sentence.includes(word));
    setSentencesWithWord(sentences);
  };

  const highlightWord = (sentence, word) => {
    const parts = sentence.split(new RegExp(`(${word})`, "gi"));
    return parts.map((part, index) => (
      <span
        key={index}
        className={
          part.toLowerCase() === word.toLowerCase() ? "bg-yellow-300" : ""
        }
      >
        {part}
      </span>
    ));
  };

  return (
    <div className="flex flex-col items-center">
      <img src="logo.svg" alt="sonar" className="h-10 pt-4" />
      <p className="text-lg font-semibold font-mono">
        Transforming text into insights, one word at a time
      </p>
      <div className="flex flex-col lg:flex-row w-screen">
        <div className="flex flex-col gap-3 p-4 w-full">
          <p className="font-bold font-serif">Enter your text:</p>
          <Textarea
            className="h-[60vh] overflow-auto"
            placeholder="Enter your text here ........."
            value={text}
            onChange={handleTextChange}
          />
          <Button className="w-fit" onClick={handleScraping}>
            Start Scraping
          </Button>
        </div>
        <div className="flex flex-col gap-3 p-4 w-full">
          <p className="font-bold font-serif">Scrap Result</p>
          <div className="flex flex-col items-center border rounded-lg h-[60vh] justify-center overflow-auto">
            {Object.keys(wordCount).length === 0 ? (
              <p className="text-slate-500">List of keywords with count</p>
            ) : (
              <div className="flex flex-col w-full h-full p-4">
                {/* Sorted keywords list */}
                {Object.entries(wordCount)
                  .sort(([wordA], [wordB]) => wordA.localeCompare(wordB))
                  .map(([word, count], index) => (
                    <p
                      key={index}
                      className="cursor-pointer hover:bg-gray-200"
                      onClick={() => handleWordClick(word)}
                    >
                      {word} ({count})
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full p-4">
        <p className="font-bold font-serif">Lines Containing: {selectedWord}</p>
        <div className="flex flex-col gap-2">
          {/* Show each sentence that contains the selected word with highlighting */}
          {sentencesWithWord.length === 0 ? (
            <p className="text-slate-500">
              Click word from key word to see the sentence list
            </p>
          ) : (
            <div className="">
              {sentencesWithWord.map((sentence, index) => (
                <p key={index}>{highlightWord(sentence, selectedWord)}</p>
              ))}
            </div>
          )}
        </div>
      </div>
      <footer className="bg-black text-white w-screen flex justify-center text-sm py-1 px-8">
        <a href="https://github.com/Thinkrave/Sonar.git" className="flex gap-4">
          <Github />
          <Glasses />
        </a>
      </footer>
    </div>
  );
}
