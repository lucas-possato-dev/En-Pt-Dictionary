import { useEffect, useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [change, setChange] = useState("dictionary");
  const [arr, setArr] = useState([]);
  const [newArr, setNewArr] = useState([]);
  const [toggle, setToggle] = useState(false);
  const key =
    "dict.1.1.20230629T154520Z.c29a54fa4b3e97b6.9b544c787f546d9d1c7f05b04ab5ea261a72810d";

  const handleClick = (id) => {
    setNewArr(
      arr.filter((item) => {
        const { text, pos } = item;
        return id === text + pos;
      })
    );
  };

  useEffect(() => {
    fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-pt&text=${
      change === "" ? "Dictionary" : change
    }
    `)
      .then((response) => response.json())
      .then((data) => setArr(data.def));
  }, [change]);

  return (
    <div className="App bg-slate-800 min-h-screen text-center p-5">
      <div className="">
        <h1 className="text-5xl font-bold text-white w-full md:w-2/3 py-5 rounded-lg bg-slate-600 mx-auto shadow-lg shadow-slate-500">
          En-Pt Dictionary
        </h1>
      </div>
      <div className="flex bg-slate-200 w-full md:w-2/3 mb-5 mt-10 rounded-md shadow-md shadow-slate-400 mx-auto">
        <input
          onChange={(e) => {
            setChange(e.target.value);
          }}
          value={change}
          type="text"
          placeholder="Search a word"
          className="w-full p-2 border-none outline-none bg-transparent"
        />
        <button
          className="px-2 m-px bg-slate-500 text-white rounded"
          onClick={() => {
            setChange("");
          }}
        >
          Reset
        </button>
      </div>
      {arr.map((element) => {
        let { text, pos, tr } = element;
        let id = text + pos;
        return (
          <div
            key={id}
            className="box shadow-md shadow-slate-500 w-full md:w-2/3 rounded bg-slate-600 py-5 mx-auto"
          >
            <div className="group duration-100 hover:bg-slate-500 px-2 my-px ">
              <div
                onClick={(e) => {
                  handleClick(id), setToggle(true);
                }}
                className="flex items-center justify-between"
              >
                <p className="text-left flex items-center gap-2">
                  <span className="text-white font-semibold text-2xl group-hover:underline px-2">
                    {text}
                  </span>
                  <span className="text-slate-400">{pos}</span>
                </p>
              </div>
              <div className="text-left text-base text-slate-300 px-2">
                <span>
                  {tr.map(({ text }) => (
                    <span key={text}>{text} </span>
                  ))}
                </span>
              </div>
              <div className="">
                {toggle && <Modal setClose={setToggle} all={newArr} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
