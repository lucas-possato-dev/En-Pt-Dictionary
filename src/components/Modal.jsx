function Modal({ setClose, all }) {
  return (
    <>
      {all.map(({ text, pos, tr }, index) => {
        const firstTr = tr.slice(0, 1); // Obtém apenas o primeiro elemento de tr
        return (
          <div
            key={index}
            onClick={(e) =>
              e.target.className.includes("modal")
                ? setClose(false)
                : setClose(true)
            }
            className="modal flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-[#00000050] backdrop-blur"
          >
            <div className="w-2/3 bg-slate-800 p-2 rounded shadow-md shadow-slate-500 border-slate-400 border">
              <h2 className="text-left text-2xl text-white font-bold">
                {text} {firstTr.length > 0 ? `| {${firstTr[0].text}}` : ""}
              </h2>
              <hr />
              <p className="mt-5 text-slate-400 text-left">{pos}</p>
              <div className="text-left text-base text-slate-300">
                {firstTr.map(({ text }) => {
                  return <li key={text}>{text}</li>;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Modal;
