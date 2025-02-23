"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image"; // Import Next.js Image
import Header from "../../components/Header";

interface AppData {
  id: number;
  name: string;
  image: string;
  description: string;
  url: string;
  rating: number;
  reviews: number;
  category: string;
  features: string;
  additional_info: Record<string, string> | string | null;
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function AIDetail() {
  const params = useParams<Record<string, string>>();
  const slug = params?.slug;

  const [app, setApp] = useState<AppData | null>(null);

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

  return (
    <>
      <Header />
      <div className="mt-10 min-h-screen bg-black text-white flex flex-col justify-start items-center p-10 w-full">
        <div className="flex items-center bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-lg">
          <Image
            src={app.image}
            alt={app.name}
            width={70}
            height={70}
            className="rounded-md transition-transform duration-300 object-cover"
            unoptimized
          />
          <div className="ml-4 flex-1">
            <h1 className="text-xl font-bold">{app.name}</h1>
            <p className="text-gray-400 text-sm">{app.category}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-yellow-400 text-lg font-semibold">⭐ {app.rating}</span>
              <span className="text-gray-500">({app.reviews} reviews)</span>
            </div>
          </div>
          <div className="ml-auto flex flex-col space-y-2">
            <button
              onClick={() => (window.location.href = app.url)}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Try
            </button>
            <button className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition">
              View in Store
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-400">{app.description}</p>
        </div>

        {/* Features */}
        <div className="mt-6 bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-2">Features</h2>
          <p className="text-gray-400">{app.features}</p>
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
          {app.additional_info && typeof app.additional_info === "object" ? (
            <ul className="text-gray-400 list-disc list-inside">
              {Object.entries(app.additional_info).map(([key, value]) => (
                <li key={key}>
                  <span className="font-semibold capitalize">{key.replace(/_/g, " ")}:</span> {value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">{app.additional_info || "No additional information available."}</p>
          )}
        </div>
      </div>
    </>
  );
}
