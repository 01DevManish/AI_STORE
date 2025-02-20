'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

export default function AiDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [aiData, setAiData] = useState<AI | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const res = await fetch(`/api/getAiBySlug?slug=${slug}`);
      const result = await res.json();
      setAiData(result);
    };

    fetchData();
  }, [slug]);

  if (!aiData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={aiData.image_url} alt={aiData.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-2xl font-bold">{ai.name}</h1>
          <p className="text-gray-600 mt-2">{ai.description}</p>
          <p><strong>Category:</strong> {ai.category}</p>
          <p><strong>Platform:</strong> {ai.platform}</p>
          <p><strong>Rating:</strong> {ai.rating}</p>
          <p><strong>Developer:</strong> {ai.developer_name}</p>
          <a href={aiData.ai_url} className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg transition hover:bg-blue-700" target="_blank" rel="noopener noreferrer">
            Visit AI Tool
          </a>
        </div>
      </div>
    </div>
  );
}
