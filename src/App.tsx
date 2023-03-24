import axios from "axios";
import { useEffect, useState } from "react";

function App(): JSX.Element {
  const [currentWord, setCurrentWord] = useState<string | undefined>(undefined);
  const [guessStatus, setGuessStatus] = useState<Record<string, string>>({});

  async function fetchAndStoreWord(wordLength: number) {
    const wordData = await axios.get(
      `https://random-word-api.herokuapp.com/word?length=${wordLength}`
    );
    setCurrentWord(wordData.data);
  }

  function createWordStatusObject(
    currentWord: string | undefined
  ): Record<string, string> {
    const statusObj: Record<string, string> = {};
    if (currentWord === undefined) {
      console.log("current word is empty");
    } else {
      const splitWord: string[] = currentWord[0].split("");
      for (const letter of splitWord) {
        if (letter === splitWord[0]) {
          statusObj[letter] = "correct";
        } else {
          statusObj[letter] = "incorrect";
        }
      }
      return statusObj;
    }
    return {};
  }

  useEffect(() => {
    setGuessStatus(createWordStatusObject(currentWord));
  }, [currentWord]);

  console.log(guessStatus);
  return (
    <>
      <h1>LINGO</h1>
      <button onClick={() => fetchAndStoreWord(4)}>Get 4 letter word</button>
      <button onClick={() => fetchAndStoreWord(5)}>Get 5 letter word</button>
      <p>{currentWord}</p>
    </>
  );
}

export default App;
