import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { profile } from "../../data/profile";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
  // Tracks whether the mobile hamburger menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          Nikhil Kumar
        </NavLink>

        {/* Hamburger button - only visible on mobile via CSS */}
        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* NavLink automatically adds an "active" class to whichever link matches the current URL */}
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
          <li>
            <NavLink to="/" className={styles.link} onClick={closeMenu} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={styles.link} onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" className={styles.link} onClick={closeMenu}>
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={styles.link} onClick={closeMenu}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/experience"
              className={styles.link}
              onClick={closeMenu}
            >
              Experience
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={styles.link} onClick={closeMenu}>
              Contact
            </NavLink>
          </li>

          {/* External links and resume button live inside the same mobile menu */}
          <li className={styles.externalLinks}>
            <ThemeToggle />
            <a
              href="https://github.com/nikhilkumar0224"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/nikhilkumarnz/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              LinkedIn
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeBtn}
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
