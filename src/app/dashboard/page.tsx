"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./dashboard.css";

interface UserData {
  username: string;
  email: string;
  profilePicture: string | null;
  uploadedAIs: { id: string; name: string; likes: number; visits: number; views: number }[];
  articles: { id: string; title: string; date: string }[];
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const data: UserData = {
        username: "AIEnthusiast",
        email: "user@example.com",
        profilePicture: localStorage.getItem("profilePicture") || null,
        uploadedAIs: [
          { id: "1", name: "AI Chatbot", likes: 120, visits: 450, views: 2000 },
          { id: "2", name: "Image Generator", likes: 85, visits: 300, views: 1500 },
        ],
        articles: [
          { id: "1", title: "The Future of AI", date: "2025-02-20" },
          { id: "2", title: "AI Ethics", date: "2025-02-15" },
        ],
      };
      setUserData(data);
      setEmail(data.email);
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("profilePicture");
    window.location.href = "/login";
  };

  if (!userData) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="tab-content">
            <div className="profile-card">
              <img
                src={userData.profilePicture || "/default-profile.png"}
                alt="Profile"
                className="profile-picture"
              />
              <h2>{userData.username}</h2>
              <p>{userData.email}</p>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </div>
        );
      case "uploaded-ais":
        return (
          <div className="tab-content">
            <h2>Your Uploaded AIs</h2>
            <div className="ai-list">
              {userData.uploadedAIs.map((ai) => (
                <div key={ai.id} className="ai-card">
                  <h3>{ai.name}</h3>
                  <p>Likes: {ai.likes} | Visits: {ai.visits} | Views: {ai.views}</p>
                  <Link href={`/ai/${ai.id}`} className="view-ai-btn">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      case "articles":
        return (
          <div className="tab-content">
            <h2>Your Article Posts</h2>
            <div className="article-list">
              {userData.articles.map((article) => (
                <div key={article.id} className="article-card">
                  <h3>{article.title}</h3>
                  <p>Posted on: {article.date}</p>
                  <Link href={`/article/${article.id}`} className="view-article-btn">
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="tab-content">
            <h2>Analytics</h2>
            <div className="analytics-grid">
              {userData.uploadedAIs.map((ai) => {
                const maxScale = 2000;
                const performanceScore = ((ai.likes * 0.3 + ai.visits * 0.3 + ai.views * 0.4) / maxScale) * 100;
                return (
                  <div key={ai.id} className="analytics-card">
                    <h3>{ai.name}</h3>
                    <div className="bar-chart">
                      <div className="bar-container">
                        <span>Likes</span>
                        <div className="bar-wrapper">
                          <div
                            className="bar likes"
                            style={{ width: `${(ai.likes / maxScale) * 100}%` }}
                            title={`Likes: ${ai.likes} (${((ai.likes / maxScale) * 100).toFixed(1)}% of max)`}
                          ></div>
                          <span className="bar-value">{ai.likes}</span>
                        </div>
                      </div>
                      <div className="bar-container">
                        <span>Visits</span>
                        <div className="bar-wrapper">
                          <div
                            className="bar visits"
                            style={{ width: `${(ai.visits / maxScale) * 100}%` }}
                            title={`Visits: ${ai.visits} (${((ai.visits / maxScale) * 100).toFixed(1)}% of max)`}
                          ></div>
                          <span className="bar-value">{ai.visits}</span>
                        </div>
                      </div>
                      <div className="bar-container">
                        <span>Views</span>
                        <div className="bar-wrapper">
                          <div
                            className="bar views"
                            style={{ width: `${(ai.views / maxScale) * 100}%` }}
                            title={`Views: ${ai.views} (${((ai.views / maxScale) * 100).toFixed(1)}% of max)`}
                          ></div>
                          <span className="bar-value">{ai.views}</span>
                        </div>
                      </div>
                    </div>
                    <div className="metrics">
                      <p>Engagement Rate: <span>{((ai.likes / ai.views) * 100).toFixed(2)}%</span></p>
                      <p>Performance Score: <span>{performanceScore.toFixed(1)}%</span></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="tab-content settings-tab">
            <h2>Settings</h2>
            <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
              <label>
                Username
                <input type="text" value={userData.username} readOnly />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                New Password
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </label>
              <button type="submit" className="save-settings-btn">
                Save Changes
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav-strip">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={activeTab === "uploaded-ais" ? "active" : ""}
          onClick={() => setActiveTab("uploaded-ais")}
        >
          Uploaded AIs
        </button>
        <button
          className={activeTab === "articles" ? "active" : ""}
          onClick={() => setActiveTab("articles")}
        >
          Articles
        </button>
        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </nav>
      <main className="dashboard-content">{renderTabContent()}</main>
    </div>
  );
};

export default Dashboard;