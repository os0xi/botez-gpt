"use client";
import React, { useState, useRef } from "react";
import { toBlob } from "html-to-image";
import Image from "next/image";
// type Props = {};

function Botez() {
  const handleShare = async () => {
    if (imageRef.current === null) {
      return;
    }
    const newFile = await toBlob(imageRef.current);
    if (newFile === null) {
      return;
    }
    const data = {
      title: "MDN",
      text: "Learn web development on MDN!",
      url: "https://developer.mozilla.org",
      files: [
        new File([newFile], "nuzlocke.png", {
          type: newFile.type,
        }),
      ],
    };
    if (data === null) {
      return;
    }
    try {
      if (!navigator.canShare(data)) {
        console.error("Can't share");
      }
      await navigator.share(data);
    } catch (e) {
      console.error(e);
    }
  };
  const imageRef = useRef(null);
  const [aiName, setAiName] = useState("");
  const [aiPicture, setAiPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getAnswer() {
    setLoading(true);
    const aiRes = await fetch("./api/hello");
    const aiName = await aiRes.json();
    setAiName(aiName.name);
    setAiPicture(aiName.url);
    setLoading(false);
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

      {aiName !== "" && aiPicture !== null ? (
        <div className="flex flex-col" ref={imageRef}>
          {aiPicture && (
            <div className="w-full relative aspect-square self-center rounded-lg animate-pulse">
              <Image
                fill
                src={aiPicture}
                alt="ai image of itself"
                sizes="50vw"
                className="rounded-lg"
              />
            </div>
          )}

          <div className="text-white text-lg px-1 opacity-80">{aiName}</div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center text-white font-bold my-4 self-end mr-2 gap-3">
        {aiName && (
          <button
            className="disabled:bg-green-50  bg-transparent
          animate-pulse px-6 py-2 rounded-sm text-slate-200 self-end"
            onClick={handleShare}
          >
            {loading && (
              <div className="animate-spin text-black viewBox='0 0 24 24'">
                ߷
              </div>
            )}
            #️⃣ share
          </button>
        )}
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
