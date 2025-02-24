"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [isBrowseOpenMobile, setIsBrowseOpenMobile] = useState(false); // Mobile Browse dropdown toggle
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Null until checked
  const [profilePicture, setProfilePicture] = useState<string | null>(null); // Profile picture URL

  // Check authentication client-side after mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const picture = localStorage.getItem("profilePicture");
    setIsAuthenticated(!!token);
    setProfilePicture(picture || null);
  }, []);

  // Define nav items based on isAuthenticated state
  const navItems = [
    {
      name: "Browse",
      href: "/browse",
      dropdown: [
        { name: "New AI", href: "/browse/new-ai" },
        { name: "Most Used AI", href: "/browse/most-used" },
        { name: "AI App", href: "/browse/ai-app" },
      ],
    },
    { name: "Categories", href: "/categories" },
    { name: "AI Models", href: "/ai-models" },
    { name: "About", href: "/about" },
    ...(isAuthenticated === null
      ? [] // Render nothing until auth status is known
      : isAuthenticated
      ? [
          { name: "Upload", href: "/upload", isUpload: true },
          { name: "Profile", href: "/profile", isProfile: true },
        ]
      : [{ name: "Login", href: "/login", isLogin: true }]),
  ];

  // If auth status is still loading, render a minimal navbar
  if (isAuthenticated === null) {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link href="/">AI-Store</Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo (Left-aligned) */}
        <div className="navbar-logo">
          <Link href="/">AI-Store</Link>
        </div>

        {/* Desktop Menu (Right-aligned) */}
        <div className="navbar-menu">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`navbar-item ${item.dropdown ? "has-dropdown" : ""} ${item.isProfile ? "profile-button" : ""} ${item.isUpload ? "upload-button" : ""} ${item.isLogin ? "login-button" : ""}`}
            >
              <Link href={item.href} className="navbar-link">
                {item.isProfile ? (
                  profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="profile-picture"
                    />
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      />
                    </svg>
                  )
                ) : (
                  <>
                    {item.name}
                    {item.dropdown && (
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="dropdown-arrow"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </>
                )}
              </Link>
              {item.dropdown && (
                <ul className="dropdown-menu">
                  {item.dropdown.map((subItem) => (
                    <li key={subItem.name} className="dropdown-item">
                      <Link href={subItem.href}>{subItem.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-toggle">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="navbar-mobile-menu">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setIsBrowseOpenMobile(!isBrowseOpenMobile)}
                      className="navbar-mobile-item"
                    >
                      {item.name}
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`dropdown-arrow-mobile ${isBrowseOpenMobile ? "open" : ""}`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isBrowseOpenMobile && (
                      <ul className="mobile-dropdown">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className="navbar-mobile-item"
                              onClick={() => {
                                setIsOpen(false);
                                setIsBrowseOpenMobile(false);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`navbar-mobile-item ${item.isProfile ? "profile-mobile" : ""} ${item.isUpload ? "upload-mobile" : ""} ${item.isLogin ? "login-mobile" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.isProfile ? (
                      <>
                        {profilePicture ? (
                          <img
                            src={profilePicture}
                            alt="Profile"
                            className="profile-picture-mobile"
                          />
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                            />
                          </svg>
                        )}
                        Profile
                      </>
                    ) : (
                      item.name
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
