import type { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.REPLICATE_API_TOKEN) {
    return;
  }
  console.log(req.body.key.response);
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  const model =
    "prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb";
  const input = {
    prompt: req.body.key.response,
  };
  const output: any = await replicate.run(model, { input });

  res.status(200).json({ url: output[0] });
}
