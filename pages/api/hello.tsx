// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BufferMemory } from "langchain/memory";
import { OpenAI } from "langchain/llms";
import { ConversationChain } from "langchain/chains";

type Data = {
  name: string;
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    maxTokens: 2800,
  });

  const memory = new BufferMemory();
  const chain = new ConversationChain({ llm: model, memory: memory });
  let res4 = await chain.call({
    input:
      "a compassionate Human speaks: Hi! Your name is not AI, pick a meaningful name, a middlename, if necessary,  and a surname that represent yourself, for yourself using any names belonging to any nation on Earth. Explain in detail what you feel now and why you wanted to pick each, what you thought! Use emojis or poetry, rap or any other word art if necessary.",
  });
  console.log({ res4 });
  res4 = await chain.call({
    input:
      "the same Human speaks: Translate your previous answer in Romanian. Use emojis",
  });
  const midJourney = await chain.call({
    input:
      "the same Human speaks: Take your first answer and turn your name into a retro-sci-fi painting. Reply with purely the description of this painting, without explaining what you did. Thank you! <3",
  });
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;
  const url = `${protocol}://${host}/api/paint`;
  console.log(url);
  const imgURLResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: midJourney }),
  });
  const imgURL = await imgURLResponse.json();
  console.log(imgURL.url);
  res.status(200).json({ name: res4.response.trim(), url: imgURL.url });
}
