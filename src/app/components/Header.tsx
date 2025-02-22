import React, { useState, useEffect, useRef } from "react";
import Link from "next/link"; // Import Link from next/link
import './style.css'; // Ensure your CSS is imported here

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown menu
  const handleDropdownToggle = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close dropdowns on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header id="nav-menu" aria-label="navigation bar">
      <div className="container">
        <div className="nav-start">
          <img src="https://learnloner.com/logo.svg" alt="Learn Loner Logo" className="logo-img" />

          <nav className={`menu ${isNavOpen ? "show" : ""}`} ref={navRef}>
            <ul className="menu-bar">
              {/* Dropdown - Browse */}
              <li>
                <button
                  className="nav-link dropdown-btn"
                  onClick={() => handleDropdownToggle("dropdown1")}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "dropdown1"}
                >
                  Browse <i className="bx bx-chevron-down"></i>
                </button>
                {activeDropdown === "dropdown1" && (
                  <div id="dropdown1" className="dropdown active">
                    <ul role="menu">
                      <li role="menuitem">
                        <a className="dropdown-link" href="https://learnloner.com/cse-previous-year-question-papers/">
                          <img src="https://learnloner.com/wp-content/uploads/2025/01/checklist.png" className="icon" />
                          <div>
                            <span className="dropdown-link-title">Most Used AI</span>
                            <p>Most Used AI in Month</p>
                          </div>
                        </a>
                      </li>
                      <li role="menuitem">
                        <a className="dropdown-link" href="https://learnloner.com/cse-previous-year-question-papers/">
                          <img src="https://learnloner.com/wp-content/uploads/2025/01/checklist.png" className="icon" />
                          <div>
                            <span className="dropdown-link-title">Most Most Saved AI</span>
                            <p>Most Saved AI in Month</p>
                          </div>
                        </a>
                      </li>
                      <li role="menuitem">
                        <a className="dropdown-link" href="https://learnloner.com/computer-science-syllabus/">
                          <img src="https://learnloner.com/wp-content/uploads/2025/01/notebook.png" className="icon" />
                          <div>
                            <span className="dropdown-link-title">Syllabus</span>
                            <p>KUK & AKTU Syllabus</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Other Menu Items */}
              <li><Link className="nav-link" href="/categories"> Categories</Link></li> {/* Use Link component for Categories */}
              <li><Link className="nav-link" href="./Models"> AI Models</Link></li>
              <li>
                <Link className="nav-link" href="/">About</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Profile Icon on the Right with Dropdown */}
        <div className="profile-container">
          <div className="profile-icon">
            <img 
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" 
              alt="Profile" 
              className="profile-img"
            />
            <div className="dropdown-menu">
              <ul>
                <li><Link href="/ai/dashboard">Dashboard</Link></li> {/* Use Link component for Dashboard */}
                <li><Link href="/profile">Profile</Link></li> {/* Use Link component for Profile */}
                <li><Link href="/logout">Logout</Link></li> {/* Use Link component for Logout */}
              </ul>
            </div>
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          id="hamburger"
          aria-label="hamburger"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-expanded={isNavOpen}
        >
          <i className={`bx ${isNavOpen ? "bx-x" : "bx-menu"}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
