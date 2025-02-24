'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


interface AI {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
  rating: number;
}

const categories = [
  'Text&Writing', 'Image', 'Video', 'Code&IT', 'Voice', 'Business', 'Marketing',
  'AI Detector', 'Chatbot', 'Design&Art', 'Life Assistant', '3D', 'Education',
  'Prompt', 'Productivity', 'Other'
];

export default function MyApp() {
  const [data, setData] = useState<AI[]>([]);
  const [category, setCategory] = useState<string>(categories[0]); // Default to first category
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!category) return; // Prevent invalid API call

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/getData?category=${encodeURIComponent(category)}`);
        const result = await res.json();
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const handleGetClick = (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/ai/${slug}`);
  };

  return (
    <>
      
      <div className="flex bg-black text-white min-h-screen flex-col md:flex-row">
        {/* Sidebar - Hidden on Mobile */}
        <aside className="w-full md:w-64 bg-gray-900 p-4 h-screen overflow-y-auto sticky top-0 md:block hidden">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left px-4 py-2 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition ${
                    category === cat ? 'bg-gray-700' : ''
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile Category Buttons - Visible on Mobile */}
        <div className="w-full md:hidden bg-gray-900 p-4 flex flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition mx-2 my-2 ${
                category === cat ? 'bg-gray-600' : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Dynamic Category Header */}
          <h2 className="text-4xl font-bold mb-6 text-center">{category}</h2>

          {/* Loading Indicator */}
          {loading && <p className="text-center text-yellow-400">Loading...</p>}

          {/* Display AI Tools */}
          <div className="grid gap-6 max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.length > 0 ? (
              data.map((ai) => (
                <div
                  key={ai.id}
                  className="bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={ai.image_url || '/fallback.jpg'}
                      alt={ai.name}
                      width={300}
                      height={160}
                      className="w-full h-full object-cover rounded-lg"
                      unoptimized
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">{ai.name}</h2>
                    <p className="text-gray-400 text-sm mt-1">{ai.category}</p>
                    <button
                      onClick={() => handleGetClick(ai.name)}
                      className="px-3 py-1 border border-blue-500 text-blue-500 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition"
                    >
                      Get
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No AI tools found in this category.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
