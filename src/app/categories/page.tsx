'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
  const [category, setCategory] = useState<string>(''); // State for selected category
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (selectedCategory: string) => {
      setLoading(true); // Start loading
      const res = await fetch(`/api/getData?category=${selectedCategory}`);
      const result = await res.json();
      setData(Array.isArray(result) ? result : []);
      setLoading(false); // Stop loading
    };

    if (category) {
      fetchData(category); // Fetch filtered data based on category
    } else {
      fetchData(''); // Fetch all data if no category is selected
    }
  }, [category]);

  const handleGetClick = (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/ai/${slug}`);
  };

  return (
    <>
      <Header />
      <div className="bg-black text-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">AI Tools Store</h1>

        {/* Category Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setCategory('Video Ai')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Video Categories
          </button>
          <button
            onClick={() => setCategory('Audio Ai')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
          >
            Audio Categories
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && <p className="text-center text-yellow-400">Loading...</p>}

        {/* Display AI Tools */}
        <div className="grid gap-6 max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((ai) => (
            <div
              key={ai.id}
              className="bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="relative w-full h-40">
                <Image
                  src={ai.image_url || '/fallback.jpg'} // Fallback image
                  alt={ai.name}
                  width={300}
                  height={160}
                  className="w-full h-full object-cover rounded-lg"
                  unoptimized // Optional: removes Next.js optimization for testing
                />
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{ai.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{ai.category}</p>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2">{ai.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-yellow-400 text-sm font-medium">⭐ {ai.rating}</span>
                  <button
                    onClick={() => handleGetClick(ai.name)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500"
                  >
                    Get
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
