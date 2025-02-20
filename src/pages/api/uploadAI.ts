
import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'srv1261.hstgr.io',  // Replace with your Hostinger database host (e.g., 'localhost' or your Hostinger server IP)
    user: 'u495328535_aistore',  // Replace with your MySQL username
    password: 'My8572839479#',  // Replace with your MySQL password
    database: 'u495328535_AIStore',
});

connection.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      name,
      category,
      description,
      file_type,
      file_size,
      developer_name,
      version,
      platform,
      rating,
      download_count,
      image_url,
      ai_url,
    } = req.body;

    const query = `
      INSERT INTO AIs (name, category, description, file_type, file_size, developer_name, version, platform, rating, download_count, image_url, ai_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [
        name,
        category,
        description,
        file_type,
        file_size,
        developer_name,
        version,
        platform,
        rating,
        download_count,
        image_url,
        ai_url,
      ],
      (error) => {
        if (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
        return res.status(200).json({ success: true, message: 'AI uploaded successfully' });
      }
    );
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
