'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header'

interface AI {
  id: number;
  name: string;
  category: string;
  description: string;
  file_type: string;
  file_size: number;
  upload_date: string;
  developer_name: string;
  version: string;
  platform: string;
  rating: number;
  download_count: number;
  is_active: boolean;
  image_url: string;
  ai_url: string;
}

export default function MyApp() {
  const [data, setData] = useState<AI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/getData');
      const result = await res.json();
      setData(Array.isArray(result) ? result : []);
    };

    fetchData();
  }, []);

  return (
    <>
    <Header/>
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <h1 className="text-center text-2xl font-bold my-6">AI Tools from MySQL</h1>
      <div className="grid gap-6 p-6 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((ai) => (
          <div
            key={ai.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img src={ai.image_url} alt={ai.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{ai.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{ai.description}</p>
              <p>
                <strong>Category:</strong> {ai.category}
              </p>
              <p>
                <strong>Platform:</strong> {ai.platform}
              </p>
              <p>
                <strong>Rating:</strong> {ai.rating}
              </p>
              <p>
                <strong>Developer:</strong> {ai.developer_name}
              </p>
              <a
                href={ai.ai_url}
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg transition hover:bg-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
