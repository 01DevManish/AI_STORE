"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./page.css";

interface AI {
  id: string;
  name: string;
  description: string;
  image: string;
  video?: string;
  category: string;
  likes: number;
  visits: number;
  views: number;
}

const Page: React.FC = () => {
  const [ais, setAIs] = useState<AI[]>([]);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cardStyles, setCardStyles] = useState<Record<string, React.CSSProperties>>({});

  useEffect(() => {
    const fetchAIs = async () => {
      setIsLoading(true);
      const mockAIs: AI[] = [
        { id: "1", name: "AI Chatbot", description: "Conversational genius", image: "/ai-chatbot.png", video: "/ai-chatbot.mp4", category: "Chatbots", likes: 120, visits: 450, views: 2000 },
        { id: "2", name: "Image Generator", description: "Visual creativity", image: "/image-gen.png", video: "/image-gen.mp4", category: "Image Generators", likes: 85, visits: 300, views: 1500 },
        { id: "3", name: "Analytics AI", description: "Data-driven insights", image: "/analytics-ai.png", video: "/analytics-ai.mp4", category: "Analytics", likes: 95, visits: 600, views: 1800 },
        { id: "4", name: "Voice Assistant", description: "Voice-powered help", image: "/voice-ai.png", category: "Voice AI", likes: 150, visits: 500, views: 2200 },
        { id: "5", name: "ChatMaster", description: "Next-gen chat", image: "/chatmaster.png", category: "Chatbots", likes: 110, visits: 400, views: 1900 },
        { id: "6", name: "ArtBot", description: "Artistic AI", image: "/artbot.png", category: "Image Generators", likes: 90, visits: 320, views: 1600 },
      ];
      setAIs(mockAIs);
      setIsLoading(false);
    };
    fetchAIs();
  }, []);

  const trendingAIs = ais.slice(0, 3);

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Enter") return;
    setTrendingIndex((prev) => (prev - 1 + trendingAIs.length) % trendingAIs.length);
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Enter") return;
    setTrendingIndex((prev) => (prev + 1) % trendingAIs.length);
  };

  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>, aiId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (centerY - y) / centerY * 10;
    const tiltY = (x - centerX) / centerX * 10;
    setCardStyles((prev) => ({
      ...prev,
      [aiId]: { transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)` },
    }));
  };

  const resetCardTilt = (aiId: string) => {
    setCardStyles((prev) => ({
      ...prev,
      [aiId]: { transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" },
    }));
  };

  const filteredAIs = ais.filter((ai) =>
    ai.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(ais.map((ai) => ai.category))];

  return (
    <main className="main-content">
      <div className="parallax-bg">
        <div className="particles"></div>
      </div>

      {isLoading ? (
        <div className="loader">
          <div className="ai-spinner"></div>
          <p>Loading AI Innovations...</p>
          {/* Skeleton Loader for Trending Section */}
          <section className="trending-section">
            <h2>Trending AIs</h2>
            <div className="trending-carousel">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="trending-card skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="trending-info">
                    <div className="skeleton-text"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Skeleton Loader for Categories */}
          <section className="ai-categories">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="category-row">
                <h2 className="category-tab skeleton-tab"></h2>
                <div className="ai-row skeleton-row">
                  {Array(3).fill(0).map((_, j) => (
                    <div key={j} className="ai-card skeleton-card">
                      <div className="skeleton-image"></div>
                      <div className="skeleton-text"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <>
          <section className="trending-section">
            <h2>Trending AIs</h2>
            <div className="trending-carousel">
              {trendingAIs.map((ai, index) => (
                <div
                  key={ai.id}
                  role="article"
                  aria-label={`Trending AI: ${ai.name}`}
                  className={`trending-card ${index === trendingIndex ? "active" : ""}`}
                  style={{
                    ...cardStyles[ai.id],
                    transform: `${cardStyles[ai.id]?.transform || "perspective(1000px) rotateX(0deg) rotateY(0deg)"} translateX(${(index - trendingIndex) * 100}%)`,
                  }}
                  onMouseMove={(e) => handleCardTilt(e, ai.id)}
                  onMouseLeave={() => resetCardTilt(ai.id)}
                >
                  {ai.video ? (
                    <video src={ai.video} autoPlay loop muted className="trending-video" /> 
                  ) : (
                    <img src={ai.image} alt={ai.name} className="trending-image" loading="lazy" />
                  )}
                  <div className="trending-info">
                    <h3>{ai.name}</h3>
                    <p>{ai.description}</p>
                    <div className="trending-stats">
                      <span>❤️ {ai.likes}</span>
                      <span>👁️ {ai.visits}</span>
                      <span>📊 {ai.views}</span>
                    </div>
                    <Link href={`/ai/${ai.id}`} className="view-details">
                      Explore
                    </Link>
                  </div>
                  <div className="holographic-overlay"></div>
                </div>
              ))}
              <button
                aria-label="Previous trending AI"
                className="carousel-arrow left"
                onClick={handlePrev}
                onKeyDown={handlePrev}
                tabIndex={0}
              >
                ◀
              </button>
              <button
                aria-label="Next trending AI"
                className="carousel-arrow right"
                onClick={handleNext}
                onKeyDown={handleNext}
                tabIndex={0}
              >
                ▶
              </button>
              <div className="carousel-dots">
                {trendingAIs.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === trendingIndex ? "active" : ""}`}
                    onClick={() => setTrendingIndex(index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Go to trending AI ${index + 1}`}
                    onKeyDown={(e) => e.key === "Enter" && setTrendingIndex(index)}
                  ></span>
                ))}
              </div>
            </div>
          </section>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search AIs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for AI tools"
            />
          </div>

          <nav className="category-nav">
            {categories.map((category) => (
              <Link
                key={category}
                href={`#${category.toLowerCase()}`}
                className={`category-link ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Link>
            ))}
          </nav>

          <section className="ai-categories">
            {searchQuery ? (
              <div className="search-results">
                <h2>Search Results</h2>
                <div className="ai-grid">
                  {filteredAIs.length > 0 ? (
                    filteredAIs.map((ai) => (
                      <div
                        key={ai.id}
                        role="article"
                        aria-label={`AI: ${ai.name}`}
                        className="ai-card"
                        style={cardStyles[ai.id] || { transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" }}
                        onMouseMove={(e) => handleCardTilt(e, ai.id)}
                        onMouseLeave={() => resetCardTilt(ai.id)}
                      >
                        <img src={ai.image} alt={ai.name} className="ai-image" loading="lazy" />
                        <div className="ai-info">
                          <h3>{ai.name}</h3>
                          <p>{ai.description}</p>
                          <div className="ai-stats">
                            <span>❤️ {ai.likes}</span>
                            <span>👁️ {ai.visits}</span>
                            <span>📊 {ai.views}</span>
                          </div>
                          <Link href={`/ai/${ai.id}`} className="view-details">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-results">No AIs found matching your search.</p>
                  )}
                </div>
              </div>
            ) : (
              categories.map((category, index) => (
                <div key={category} className="category-row" id={category.toLowerCase()}>
                  <h2 className="category-tab" style={{ animationDelay: `${index * 0.2}s` }}>
                    {category}
                  </h2>
                  <div className="ai-row">
                    {filteredAIs
                      .filter((ai) => ai.category === category)
                      .slice(0, 3)
                      .map((ai) => (
                        <div
                          key={ai.id}
                          role="article"
                          aria-label={`AI: ${ai.name}`}
                          className="ai-card"
                          style={cardStyles[ai.id] || { transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" }}
                          onMouseMove={(e) => handleCardTilt(e, ai.id)}
                          onMouseLeave={() => resetCardTilt(ai.id)}
                        >
                          <img src={ai.image} alt={ai.name} className="ai-image" loading="lazy" />
                          <div className="ai-info">
                            <h3>{ai.name}</h3>
                            <p>{ai.description}</p>
                            <div className="ai-stats">
                              <span>❤️ {ai.likes}</span>
                              <span>👁️ {ai.visits}</span>
                              <span>📊 {ai.views}</span>
                            </div>
                            <Link href={`/ai/${ai.id}`} className="view-details">
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                    <Link href={`/category/${category.toLowerCase()}`} className="discover-more">
                      Discover More
                    </Link>
                  </div>
                </div>
              ))
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default Page;
