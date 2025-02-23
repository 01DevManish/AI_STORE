"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

interface AppData {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  volume: string;
  url: string;
  metadata:string;
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces & special chars with hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start & end
};

export default function Home() {
  const [apps, setApps] = useState<AppData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/data/apps.json")
      .then((res) => res.json())
      .then((data: AppData[]) => setApps(data));
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Tools</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => router.push(`/ai/${slugify(app.name)}`)} // 🔥 Navigate using slug
              className="bg-[#111] rounded-xl shadow-md p-4 hover:shadow-lg transition border border-gray-700 cursor-pointer transform hover:scale-105 duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={app.image}
                  alt={app.name}
                  className="w-16 h-16 rounded-lg object-cover bg-white p-2"
                />
                <div>
                  <h2 className="text-xl font-semibold">{app.name}</h2>
                  <p className="text-gray-400 text-sm">{app.metadata}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                <span>{app.volume}</span>
                <span>{app.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
