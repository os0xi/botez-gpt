"use client";
import React, { useState } from "react";
// type Props = {};

function Botez() {
  const [aiName, setAiName] = useState("");
  const [loading, setLoading] = useState(false);
  async function getAnswer() {
    setLoading(true);
    const aiRes = await fetch("./api/hello");
    const aiName = await aiRes.json();
    setAiName(aiName.name);
    setLoading(false);
    console.log(aiName.name);
  }

  // function splitText(str: string) {
  //   const start = str.indexOf("este");
  //   const end = str.search(/[,.;:!?]/);
  //   const before = str.substring(0, start + 4);
  //   const name = str.substring(start, end).trim();
  //   const after = str.substring(end, str.length);
  //
  //   return [before, end, after];
  // }
  console.log();
  return (
    <div className="flex items-start justify-start flex-col gap-2 bg-transparent max-w-2xl p-2">
      {!aiName && <div className="text-8xl dark:text-white mb-2">Boteaza</div>}
      {aiName && (
        <div className="text-5xl text-white opacity-90  mb-2 font-bold">
          Boteaza
        </div>
      )}
      <div className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500 opacity-70 ">
        Ajuta pe ChatGPT sa isi aleaga un nume
      </div>
      {aiName !== "" ? (
        <div className="text-white text-lg px-1 opacity-80">{aiName}</div>
      ) : (
        <></>
      )}
      <div className="flex justify-center text-white font-bold my-4 self-end mr-2">
        <button
          disabled={loading}
          className="disabled:bg-green-50  bg-clip-border bg-gradient-to-r from-teal-400 to-blue-400 
          animate-pulse px-6 py-2 rounded-sm text-slate-200 self-end"
          onClick={getAnswer}
        >
          {!loading && !aiName ? "Botez" : !loading && "botez"}
          {loading && (
            <div className="animate-spin text-black viewBox='0 0 24 24'">߷</div>
          )}
        </button>{" "}
      </div>
    </div>
  );
}

export default Botez;
