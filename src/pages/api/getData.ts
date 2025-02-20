import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API request received at /api/getData");

  pool.query('SELECT * FROM AIs', (err, results) => {
    if (err) {
      console.error("Database Query Error:", err);
      res.status(500).json({
        error: "Database query failed",
        details: err.message || "No additional error details",
      });
      return;
    }

    console.log("Fetched Data:", results);
    res.status(200).json(results);
  });
}
