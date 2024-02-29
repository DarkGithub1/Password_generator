import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  //use State
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [uppercaseAllowed, setUpperCaseAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if(uppercaseAllowed) str+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length );
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword,uppercaseAllowed]);

  //useref
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  //useEffect
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator,uppercaseAllowed]);

  return (
    <>
      <div className= "bg-slate-200 h-screen flex flex-col justify-center items-center  ">
        <div className="w-1/2 h-1/2 border bg-gray-950 flex  gap-4 justify-center ">
          <div className=" rounded-md   flex flex-col h-1/2  my-auto justify-evenly items-center">
            <h1 className="text-white font-serif  text-3xl text-center my-auto">
              Password generator
            </h1>
            <input
              type="text"
              value={password}
              className=" w-full outline-none bg-red-700 p-5 rounded-lg text-white  text-2xl"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="bg-red-700 mt-2 text-white w-32 h-12 text-xl rounded-md hover:bg-black "
            >
              copy
            </button>
          </div>
          <div className="flex  flex-col justify-evenly items-center h-1/2 my-auto">
            <div className="flex flex-col">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="text-white">How Long : {length}</label>
            </div>
            <div className="w-full ">
              <input
                className="mr-2"
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label className="text-white" htmlFor="numberInput">
                Numbers
              </label>
            </div>
            <div className="w-full ">
              <input
                className="mr-2"
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label className="text-white" htmlFor="characterInput">
                Characters
              </label>
            </div>
            <div className="w-full ">
              <input
                className="mr-2"
                type="checkbox"
                defaultChecked={uppercaseAllowed}
                id="characterInput"
                onChange={() => {
                  setUpperCaseAllowed ((prev) => !prev);
                }}
              />
              <label className="text-white" htmlFor="characterInput">
                Uppercase
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
