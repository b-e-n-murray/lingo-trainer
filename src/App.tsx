import axios from "axios";

function App(): JSX.Element {
  async function fetchAndStoreWord(wordLength: number) {
    console.log(wordLength);
    const fetchedWord = await axios.get(
      `https://random-word-api.herokuapp.com/word?length=${wordLength}`
    );
    console.log(fetchedWord);
  }
  return (
    <>
      <h1>LINGO</h1>
      <button onClick={() => fetchAndStoreWord(4)}>Get 4 letter word</button>
      <button onClick={() => fetchAndStoreWord(5)}>Get 5 letter word</button>
    </>
  );
}

export default App;
