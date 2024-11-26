import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}

// import { cleanupUnusedFiles } from "@/utils";

// export default async function GET(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
  
//   try {
//     await cleanupUnusedFiles();
//     res.status(200).json({ message: 'Cleanup completed' });
//   } catch (error) {
//     res.status(500).json({ error: 'Cleanup failed' });
//   }
// }