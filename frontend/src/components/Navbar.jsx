import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

const socials = [
  { label: 'Instagram', url: 'https://instagram.com' },
  { label: 'Facebook', url: 'https://facebook.com' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: 'var(--beige-main)',
        borderBottom: '1px solid var(--beige-outline)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--blue-main)' }}>
            Wildflowers &amp; Waves
          </span>
        </Link>

        {/* Centre navigation - matches "Centre Navigation Bar" note in the site map */}
        <nav
          className="desktop-nav"
          style={{ display: 'flex', gap: 32, alignItems: 'center' }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                fontWeight: 600,
                color: isActive ? 'var(--blue-main)' : 'var(--black-blue)',
                borderBottom: isActive ? '2px solid var(--blue-main)' : '2px solid transparent',
                paddingBottom: 4,
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
              {s.label[0]}
            </a>
          ))}
          <Link to="/login" className="btn" style={{ padding: '8px 18px' }}>
            Log In
          </Link>
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--blue-main)',
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: '0 24px 16px',
          }}
        >
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} onClick={() => setMenuOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
