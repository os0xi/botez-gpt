"use client"
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Botez from "../components/Botez/Botez";

const Home: NextPage = () => {
  return (
    <div className="dark  bg-black min-h-screen h-full w-full flex justify-center items-center">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-2 h-full">
         <Botez />
      </main>
    </div>
  );
};

export default Home;
