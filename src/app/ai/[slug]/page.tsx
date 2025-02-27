"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface AppData {
  id: number;
  name: string;
  image: string;
  description: string;
  url: string;
  rating: number;
  reviews: number;
  category: string;
  feature: string[];
  additional_info: Record<string, string> | string | null;
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function AppDetail() {
  const params = useParams<Record<string, string>>();
  const slug = params?.slug;
  const [app, setApp] = useState<AppData | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (slug && typeof slug === "string") {
      fetch("/data/apps.json")
        .then((res) => res.json())
        .then((data: AppData[]) => {
          const selectedApp = data.find((app) => slugify(app.name) === slug);
          setApp(selectedApp || null);
        })
        .catch((error) => console.error("Error fetching app data:", error));
    }
  }, [slug]);

  if (!slug) return <p className="text-white text-center mt-10">Loading...</p>;
  if (!app) return <p className="text-white text-center mt-10">App not found</p>;

  const fullText = app.description;
  const previewText = fullText.split(" ").slice(0, 50).join(" ") + "...";

  return (
    <>
      <div className="bg-gradient-to-b from-blue-900 to-gray-900 p-10 text-white mt-12">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          <Image
            src={app.image}
            alt={app.name}
            width={96}
            height={96}
            className="w-24 h-24 rounded-lg object-cover"
            unoptimized
          />
          <div>
            <h1 className="text-3xl font-bold">{app.name}</h1>
            <p className="text-blue-400">{app.category}</p>
            <div className="flex items-center text-gray-300 mt-1">
              <span className="text-lg font-semibold">{app.rating}</span>
              <span className="mx-2">⭐</span>
              <span>{app.reviews} ratings</span>
              <span className="ml-4 text-blue-400">{app.category}</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-6 flex gap-4">
          <button
            onClick={() => (window.location.href = app.url)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold"
          >
            Download
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold flex items-center gap-2">
            <img src="/store-icon.png" alt="Store Icon" className="w-5 h-5" />
            View in Store
          </button>
          <p className="text-gray-400 text-sm flex items-center">Offers in-app purchases</p>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-800 p-6 mt-10 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Description</h2>
          <hr className="border-gray-700 my-2" />
          <p className="text-gray-300">{expanded ? fullText : previewText}</p>
          <button onClick={() => setExpanded(!expanded)} className="text-blue-400 mt-4 block">
            {expanded ? "Read less" : "Read more"}
          </button>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-800 p-6 mt-10 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">feature</h2>
          <hr className="border-gray-700 my-2" />
          <ul className="text-gray-300 list-disc list-inside">
            {Array.isArray(app.feature) && app.feature.length > 0 ? (
              app.feature.map((feature, index) => <li key={index}>{feature}</li>)
            ) : (
              <p>No feature available</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
