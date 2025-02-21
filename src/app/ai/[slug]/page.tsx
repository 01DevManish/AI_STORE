'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '../../components/Header';

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

export default function AIDetail() {
  const [aiData, setAiData] = useState<AI | null>(null);
  const pathname = usePathname();
  const slug = pathname?.split('/').pop();

  useEffect(() => {
    if (slug) {
      const fetchAIData = async () => {
        const res = await fetch('/api/getData');
        const result: AI[] = await res.json();
        const aiTool = result.find((tool) => tool.name.toLowerCase().replace(/\s+/g, '-') === slug);
        setAiData(aiTool || null);
      };
      fetchAIData();
    }
  }, [slug]);

  if (!aiData) return <div className="text-white text-center p-6">Loading...</div>;

  return (
    <>
      <Header />
      <div className="bg-black text-white w-full h-screen flex justify-center items-center p-6">
        <div className="w-full max-w-5xl bg-gray-900 p-8 rounded-lg shadow-xl">
          {/* Image & Name */}
          <div className="flex items-center gap-6">
            <img
              src={aiData.image_url || '/fallback.jpg'}
              alt={aiData.name}
              className="w-[120px] h-[120px] object-cover rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold">{aiData.name}</h1>
              <p className="text-blue-400 text-lg">{aiData.developer_name}</p>
            </div>
          </div>

          {/* Rating & Category */}
          <div className="mt-4 flex items-center gap-6 text-gray-400 text-sm">
            <p className="flex items-center gap-1">
              ⭐ <span className="text-lg">{aiData.rating}</span> ({aiData.download_count} downloads)
            </p>
            <p className="bg-gray-700 px-3 py-1 rounded-lg text-white text-sm">{aiData.category}</p>
          </div>

          {/* Description */}
          <p className="text-gray-300 mt-6 text-lg leading-relaxed">{aiData.description}</p>

          {/* Buttons */}
          <div className="mt-6 flex gap-6">
            <a
              href={aiData.ai_url}
              className="bg-blue-600 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-blue-500 transition"
            >
              Try it
            </a>
            <button className="bg-gray-700 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-gray-600 transition">
              View in Store
            </button>
          </div>

          {/* Additional Information */}
          <div className="mt-10 p-6 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-400 text-lg">
              <p><strong>Developed by:</strong> {aiData.developer_name}</p>
              <p><strong>Category:</strong> {aiData.category}</p>
              <p><strong>File Size:</strong> {aiData.file_size} MB</p>
              <p><strong>Version:</strong> {aiData.version}</p>
              <p><strong>Platform:</strong> {aiData.platform}</p>
              <p><strong>Release Date:</strong> {aiData.upload_date}</p>
              <p><strong>Installation:</strong> Can install on multiple devices</p>
              <p><strong>Publisher Info:</strong> <a href="#" className="text-blue-400">Support</a></p>
              <p><strong>Seizure Warning:</strong> <a href="#" className="text-red-400">Photosensitive warning</a></p>
              <p><strong>Report:</strong> <a href="#" className="text-blue-400">Report this product</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
