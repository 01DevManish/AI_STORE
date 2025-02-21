import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API request received at /api/getData");

  // Extract category from query parameters
  const { category } = req.query;

  let query = 'SELECT * FROM AIs'; // Default query to fetch all data
  const queryParams: string[] = []; // Specify the type as string[]

  // If category is provided, add a WHERE clause to the query
  if (category) {
    query += ' WHERE category = ?';
    queryParams.push(category as string); // Ensure category is treated as a string
  }

  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Database Query Error:", err);
      res.status(500).json({
        error: "Database query failed",
        details: err.message || "No additional error details",
      });
      return;
    }

    console.log("Fetched Data:", results);
    res.status(200).json(results); // Send the filtered data back
  });
}
