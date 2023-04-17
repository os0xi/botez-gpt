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
    "ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f";
  const input = {
    prompt: req.body.key.response,
    num_inference_steps: 100,
  };
  const output: any = await replicate.run(model, { input });

  res.status(200).json({ url: output[0] });
}
