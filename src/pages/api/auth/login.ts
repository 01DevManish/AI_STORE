import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from '../../../lib/db';

// Define the correct type for the query result
import { RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Ensure to specify the correct type for the query result
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result: RowDataPacket[]) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (result.length === 0) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const user = result[0];

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Create JWT token
      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

      return res.status(200).json({ token });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
