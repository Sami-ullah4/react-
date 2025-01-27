const mems = [
  "he is Seley gay",
  "she is so pretty",
  "she so agley",
  "thy going to shop",
];
import { useCallback, useState } from "react";
const Jokes = () => {
  const [sentence, setSentance] = useState([]);
  // Memoize the handelClick function using useCallback
  const handelClick = useCallback(() => {
    const randomIndex = Math.trunc(Math.random() * mems.length);

    const randomMeme = mems[randomIndex];
    setSentance(randomMeme);
  }, []); // Dependencies: Re-create the function if mems changes

  return (
    <>
      <button
        className="btn bg-purple-300 text-bold text-black"
        onClick={handelClick}
      >
        Joke
      </button>
      <h1> {sentence} </h1>
    </>
  );
};

export default Jokes;
