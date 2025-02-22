"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";

interface AppData {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  volume: string;
  url: string;
}

export default function Home() {
  const [apps, setApps] = useState<AppData[]>([]);

  useEffect(() => {
    fetch("/data/apps.json")
      .then((res) => res.json())
      .then((data: AppData[]) => setApps(data));
  }, []);

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-[#111] rounded-xl shadow-md p-4 hover:shadow-lg transition border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={app.image}
                alt={app.name}
                className="w-16 h-16 rounded-lg object-cover bg-white p-2"
              />
              <div>
                <h2 className="text-xl font-semibold">{app.name}</h2>
                <p className="text-gray-400 text-sm">{app.description}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
              <span>{app.volume}</span>
              <span> {app.category}</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white text-xs px-3 py-1 rounded-lg"
              >
                <i className="fas fa-external-link-alt mr-2"></i> Visit
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
