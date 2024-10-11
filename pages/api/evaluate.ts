import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    score: 85,
    criteria: { A: 90, B: 80, C: 85 },
    date: new Date().toLocaleDateString(),
  });
}
