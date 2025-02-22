"use client";
import { useEffect, useState } from "react";

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

const ModelsPage: React.FC = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/Models.json");
        const data = await response.json();

        if (!data.Models || !Array.isArray(data.Models)) {
          throw new Error("Fetched data is not in the correct format.");
        }

        // Map and normalize data
        const formattedModels: AIModel[] = data.Models.map((model : { [key: string]: string } , index : number) => ({
          id: index + 1,
          name: model["Models"] || "Unknown Model",
          image: model["w-full src"] || "https://via.placeholder.com/50",
          source: model["Source"] || "Unknown Source",
          link: model["Link"] || "#",
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Models</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className={`${darkMode ? "bg-gray-800 text-white" : "bg-white"} min-w-full border rounded-lg shadow-md`}>
          <thead>
            <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} border-b`}>
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
              <tr key={model.id} className={`${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-b hover:bg-gray-100"}`}>
                <td className="p-3 flex items-center space-x-3">
                  <img src={model.image} alt={model.name} className="w-10 h-10 rounded" />
                  <div>
                    <p className="font-semibold">{model.name}</p>
                  </div>
                </td>
                <td className="p-3">{model.source}</td>
                <td className="p-3 text-blue-400 hover:underline">
                   <a href={model.link.startsWith("http") ? model.link : `https://${model.link}`} target="_blank" rel="noopener noreferrer">
                     {model.link.length > 30 ? model.link.substring(0, 30) + "..." : model.link}

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
  );
};

export default ModelsPage;
