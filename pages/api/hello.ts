// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as path from "path";
import * as fs from "fs";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const paramPath = req.query["path"] as string;
  const filePath = path.join(process.cwd(), paramPath);
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": stat.size,
  });
  fs.createReadStream(filePath).pipe(res);
}
