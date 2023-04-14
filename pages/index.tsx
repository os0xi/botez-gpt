import type { NextPage } from "next";
import Head from "next/head";
import Botez from "../components/Botez/Botez";

const Home: NextPage = () => {
  return (
    <div className="dark  bg-black min-h-screen h-full w-full flex justify-center items-center">
      <Head>
        <title>Botezai</title>
        <meta name="description" content="Ajuta pe GPT sa isi ia nume" />
        <link rel="shortcut icon" href="/splash.png" />{" "}
      </Head>

      <main className="p-2 h-full">
        <Botez />
      </main>
    </div>
  );
};

export default Home;
