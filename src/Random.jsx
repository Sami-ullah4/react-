import { useState, useEffect, useCallback, useRuf } from "react";

const Random = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charecterAllowed, setCharecterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //use of useRuf hook
  let passwordRef = useRuf(null);
  // Function to generate the password
  const passwordGenerator = useCallback(
    () => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllowed) str += "0123456789";
      if (charecterAllowed) str += "!@#$%^&*()_+";

      for (let i = 1; i <= length; i++) {
        const chr = Math.floor(Math.random() * str.length); // Get a random index
        pass += str.charAt(chr); // Append the character at the random index to `pass`
      }
      setPassword(pass);
    },

    // Use useEffect to generate the password when dependencies change
    [length, numberAllowed, charecterAllowed]
  ); // Dependencies

  const cpoyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charecterAllowed, passwordGenerator]);
  return (
    <div className="bg-slate-500 text-yellow-400 w-full px-4 rounded-lg my-8">
      <h1 className="text-white text-center">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
        />
        <button
          onCLick={cpoyPasswordToClipboard}
          className="bg-blue-600 text-white outline-none px-3 py-1"
          // onClick={() => navigator.clipboard.writeText(password)}
        >
          COPY
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed((prev) => !prev)}
          />
          <label>Allow Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charecterAllowed}
            onChange={(e) => setCharecterAllowed(e.target.checked)}
          />
          <label>Allow Special Characters</label>
        </div>
      </div>
    </div>
  );
};

export default Random;
