import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import db from '../../../lib/db';
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket for correct typing

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      // Check if the user already exists
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result: RowDataPacket[]) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ error: 'Database error during user lookup' });
        }

        if (result.length > 0) {
          // User exists
          return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert new user into the database
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
          if (err) {
            console.error("Database insert error:", err);
            return res.status(500).json({ error: 'Error creating user in database' });
          }

          // Successful signup
          return res.status(201).json({ message: 'User created successfully' });
        });
      });
    } catch (err) {
      console.error("Error during signup:", err);
      return res.status(500).json({ error: 'Unexpected error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
