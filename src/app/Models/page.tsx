"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";

interface AIModel {
  id: number;
  name: string;
  image: string;
  source: string;
  link: string;
  totalRuns: string;
  growth: string;
  growthRate: string;
  updatedTime: string;
}

export default function ModelsPage() {
  const [models, setModels] = useState<AIModel[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/Models.json");
        const data = await response.json();

        if (!data.Models || !Array.isArray(data.Models)) {
          throw new Error("Fetched data is not in the correct format.");
        }

        // Map and normalize data
        const formattedModels: AIModel[] = data.Models.map((model: { [key: string]: string }, index: number) => ({
          id: index + 1,
          name: model["Models"] || "Unknown Model",
          image: model["w-full src"] || "https://via.placeholder.com/50",
          source: model["Source"] || "Unknown Source",
          link: model["Link"]?.replace(/^https?:\/\//, "") || "#",
          totalRuns: model["Total Run"] || "N/A",
          growth: model["Source 3"] || model["Growth "] || "N/A",
          growthRate: model["Growth  Rate"] || "N/A",
          updatedTime: model["Updated Date"] || "N/A",
        }));

        setModels(formattedModels);
      } catch (error) {
        console.error("Error fetching models:", error);
        setModels([]); // Ensure models is always an array
      }
    };

    fetchModels();
  }, []);

  return (
    <>
      <Header/>
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">AI Models</h1>

      <div className="overflow-x-auto">
        <table className="bg-gray-800 text-white min-w-full border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 border-b">
              <th className="p-3 text-left">Model</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Link</th>
              <th className="p-3 text-left">Total Runs</th>
              <th className="p-3 text-left">Growth</th>
              <th className="p-3 text-left">Growth Rate</th>
              <th className="p-3 text-left">Updated Time</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id} className="border-gray-700 hover:bg-gray-700">
                <td className="p-3 flex items-center space-x-3">
                  <img src={model.image} alt={model.name} className="w-10 h-10 rounded" />
                  <div>
                    <p className="font-semibold">{model.name}</p>
                  </div>
                </td>
                <td className="p-3">{model.source}</td>
                <td className="p-3 text-blue-400 hover:underline">
         <a href={`https://${model.link}`} target="_blank" rel="noopener noreferrer">
    {model.link.length > 30 ? model.link.substring(0, 30) + "..." : model.link}
  </a>
                </td>
                <td className="p-3">{model.totalRuns}</td>
                <td className="p-3 text-purple-400 font-bold">{model.growth}</td>
                <td className="p-3 text-green-400 font-bold">{model.growthRate}</td>
                <td className="p-3">{model.updatedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      </>
  );
}
