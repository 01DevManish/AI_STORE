import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug is required' });
  }

  const query = `
    SELECT * FROM AIs 
    WHERE LOWER(REPLACE(REGEXP_REPLACE(name, "[^a-zA-Z0-9 ]", ""), " ", "-")) = ?
  `;

  connection.query(query, [slug], (err, results) => {
    if (err) {
      console.error('Database Query Error:', err);
      return res.status(500).json({ error: 'Database query failed', details: err.message });
    }

    // ✅ Fix: Ensure results is an array before checking length
    if (!results || !Array.isArray(results) || results.length === 0) {
      return res.status(404).json({ error: 'AI Tool not found' });
    }

    return res.status(200).json(results[0]);
  });
}
