'use client'
import { useEffect, useState } from 'react';
  // Use next/navigation for navigation
import { usePathname } from 'next/navigation'; // To get the current pathname (including slug)
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
  const slug = pathname?.split('/').pop();  // Extract slug from the pathname

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

  if (!aiData) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="bg-black text-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">{aiData.name}</h1>
        <div className="flex gap-6">
          <div className="w-1/3">
            <img
              src={aiData.image_url || '/fallback.jpg'}
              alt={aiData.name}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg text-gray-300">{aiData.description}</p>
            <div className="mt-4">
              <p><strong>Category:</strong> {aiData.category}</p>
              <p><strong>Rating:</strong> {aiData.rating}</p>
              <p><strong>File Type:</strong> {aiData.file_type}</p>
              <p><strong>Platform:</strong> {aiData.platform}</p>
              <p><strong>Developer:</strong> {aiData.developer_name}</p>
            </div>
            <a
              href={aiData.ai_url}
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Try it Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
