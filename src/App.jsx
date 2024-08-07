import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const createPassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ";
    if (isNumAllowed) str += "0123456789";
    if (isCharAllowed) str += "~!@#$&*^?:;<>";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isCharAllowed, isNumAllowed, setPassword]);

  useEffect(() => {
    createPassword();
  }, [length, isCharAllowed, isNumAllowed, setPassword]);

  const copyRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    copyRef.current?.select();
    copyRef.current?.setSelectionRange(0, 30);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className=" h-screen bg-green-900 text-orange-600 py-10 right-0 bottom-0">
        <h1 className=" text-center text-2xl lg:text-5xl font-semibold mb-4">
          Password Generator
        </h1>
        <div className=" lg:w-2/3 h-auto lg:h-44 py-4 mx-6 lg:mx-auto bg-blue-300 flex flex-wrap justify-center gap-2 md:px-8 rounded-lg">
          <div className=" w-full flex flex-col p-4 space-y-4 md:flex-row md:space-y-0">
            <input
              type="text"
              className="flex-grow px-2 py-2 text-2xl  lg:text-3xl outline-none rounded md:rounded-l-md "
              placeholder="Password"
              value={password}
              readOnly
              ref={copyRef}
            />
            <button
              className=" bg-orange-500 text-white py-2 px-4 text-xl shadow-md rounded md:rounded-r-md  flex-grow-0 "
              onClick={copyToClipboard}
            >
              {" "}
              Copy
            </button>
          </div>
          <div className=" flex items-center text-xl xl:text-2xl xl:mx-2 ">
            <input
              type="range"
              className="mx-2"
              min={4}
              max={32}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length {length}</label>
          </div>
          <div className=" flex items-center text-xl xl:text-2xl  xl:mx-2">
            <input
              type="checkbox"
              className=" h-6 w-6 shadow-sm mx-2"
              defaultChecked={isNumAllowed}
              onChange={() => setIsNumAllowed((prev) => !prev)}
            />
            <label htmlFor="includeNumbers">Include Numbers</label>
          </div>
          <div className=" flex items-center text-xl xl:text-2xl xl:mx-2">
            <input
              type="checkbox"
              className=" h-6 w-6 shadow-sm mx-2"
              defaultChecked={isCharAllowed}
              onChange={() => setIsCharAllowed((prev) => !prev)}
            />
            <label htmlFor="includeCharacters">Include Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
