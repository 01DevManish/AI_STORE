'use client';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import UploadAI from '../../upload/page'; // Assuming UploadAI is in the same directory

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DashboardData {
  traffic: number[];
  views: number[];
  likes: number[];
  uploads: number[];
}

const Dashboard: React.FC = () => {
  const [trafficData, setTrafficData] = useState<number[]>([]);
  const [viewsData, setViewsData] = useState<number[]>([]);
  const [likesData, setLikesData] = useState<number[]>([]);
  const [uploadsData, setUploadsData] = useState<number[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false); // State for showing upload form
  const [showAnalytics, setShowAnalytics] = useState(true); // State for showing analytics

  useEffect(() => {
    const fetchedData: DashboardData = {
      traffic: [100, 150, 200, 250, 300],
      views: [50, 70, 90, 110, 130],
      likes: [30, 50, 60, 80, 100],
      uploads: [10, 20, 25, 30, 35],
    };
    setTrafficData(fetchedData.traffic);
    setViewsData(fetchedData.views);
    setLikesData(fetchedData.likes);
    setUploadsData(fetchedData.uploads);
  }, []);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Traffic',
        data: trafficData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Views',
        data: viewsData,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Likes',
        data: likesData,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
      },
      {
        label: 'Uploads',
        data: uploadsData,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  const handleSidebarClick = (section: string) => {
    if (section === 'upload') {
      setShowUploadForm(true);
      setShowAnalytics(false);
    } else if (section === 'analytics') {
      setShowUploadForm(false);
      setShowAnalytics(true);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile">Profile</div>
        <div className="upload-ai" onClick={() => handleSidebarClick('upload')}>Upload AI</div>
        <div className="analytics" onClick={() => handleSidebarClick('analytics')}>Analytics</div>
        <div className="logout">Logout</div>
      </div>

      <div className="content">
        <h1 className="title">AI App Dashboard</h1>

        {showUploadForm && <UploadAI/> } {/* Display UploadAI form if showUploadForm is true */}

        {showAnalytics && (
          <>
            <div className="card">
              <h2>Traffic Overview</h2>
              <Line data={data} />
            </div>

            <div className="card">
              <h2>App Views</h2>
              <Line data={data} />
            </div>

            <div className="card">
              <h2>Likes</h2>
              <Line data={data} />
            </div>

            <div className="card">
              <h2>Uploads</h2>
              <Line data={data} />
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          height: 100vh;
        }

        .sidebar {
          width: 250px;
          background-color: #333;
          color: white;
          padding: 20px;
          position: fixed;
          height: 100%;
        }

        .sidebar div {
          margin: 20px 0;
          cursor: pointer;
        }

        .sidebar div:hover {
          background-color: #444;
        }

        .content {
          margin-left: 250px;
          padding: 20px;
          width: 100%;
        }

        .title {
          text-align: center;
          margin-bottom: 40px;
        }

        .card {
          margin: 20px 0;
        }

        h2 {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
