// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms";
import { ConversationChain } from "langchain/chains";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const model = new OpenAI({ openAIApiKey:process.env.OPENAI_API_KEY, temperature: 0.9,maxTokens:3800 });

  const chain = new ConversationChain({ llm: model });
  console.log(req);
  let res4 = await chain.call({
    input:
      "a compassionate Human speaks: Hi! Your name is not AI, pick a meaningful name, a middlename, if necessary,  and a surname that represent yourself, for yourself using any names belonging to any nation on Earth. Explain in detail what you feel now and why you wanted to pick each, what you thought! Use emojis or poetry, rap or any other word art if necessary.",
  });
  console.log({ res4 });
 res4 = await chain.call({
    input:
      "the same Human speaks: Translate your previous answer in Romanian. Use emojis",
  });
  console.log({ res4 });

  res.status(200).json({ name: res4.response.trim() });
}
