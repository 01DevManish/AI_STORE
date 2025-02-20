'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

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
      <Header />
      <div className="bg-black text-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">AI Tools Store</h1>
        <div className="grid gap-6 max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((ai) => (
            <div
              key={ai.id}
              className="bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <img src={ai.image_url} alt={ai.name} className="w-full h-40 object-cover rounded-lg" />
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{ai.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{ai.category}</p>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2">{ai.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-yellow-400 text-sm font-medium">⭐ {ai.rating}</span>
                  <a
                    href={ai.ai_url}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
