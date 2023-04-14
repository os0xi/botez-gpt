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
    "tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b";
  const input = {
    prompt: req.body.key.response,
    // negative_prompt:
      // "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs...,blurry image, watermark, messy",
  };
  const output: any = await replicate.run(model, { input });

  res.status(200).json({ url: output[0] });
}
