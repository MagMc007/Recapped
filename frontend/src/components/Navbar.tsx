'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RecappedLogo } from './RecappedLogo';

interface NavbarProps {
  onOpenAuth?: () => void;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  currentUser,
  onLogout,
}) => {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme from localStorage or document attribute
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('recapped_theme') as 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        setTheme(isDark ? 'dark' : 'light');
      }
    } catch {}
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('recapped_theme', nextTheme);
    } catch {}
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const isMovies = pathname === '/movies';

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled
            ? theme === 'dark'
              ? 'rgba(7,13,26,0.96)'
              : 'rgba(238,242,251,0.96)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.3s ease',
          padding: '0 16px',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: 0,
              textDecoration: 'none',
            }}
          >
            <RecappedLogo size={65} />
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-tabs-desktop items-center gap-1.5 overflow-x-auto">
            <Link
              href="/"
              style={{
                ...navBtn,
                color: isHome ? 'var(--accent)' : 'var(--text)',
                borderColor: isHome ? 'var(--accent)' : 'var(--border)',
                background: isHome ? 'var(--accent-glow)' : 'transparent',
              }}
            >
              Home
            </Link>

            <Link
              href="/#dilemma"
              style={{
                ...navBtn,
                color: 'var(--text)',
                borderColor: 'var(--border)',
                background: 'transparent',
              }}
            >
              The Dilemma
            </Link>

            <Link
              href="/#how-it-works"
              style={{
                ...navBtn,
                color: 'var(--text)',
                borderColor: 'var(--border)',
                background: 'transparent',
              }}
            >
              How It Works
            </Link>

            <Link
              href="/#creators"
              style={{
                ...navBtn,
                color: 'var(--text)',
                borderColor: 'var(--border)',
                background: 'transparent',
              }}
            >
              Creators
            </Link>

            <Link
              href="/movies"
              style={{
                ...navBtn,
                color: isMovies ? 'var(--accent)' : 'var(--text)',
                borderColor: isMovies ? 'var(--accent)' : 'var(--border)',
                background: isMovies ? 'var(--accent-glow)' : 'transparent',
                fontWeight: 600,
              }}
            >
              All Recaps
            </Link>
          </div>

          {/* Right Action Area */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={iconBtn}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
              type="button"
            >
              {theme === 'dark' ? '☀' : '☽'}
            </button>

            {/* Desktop Auth Buttons */}
            <div className="nav-desktop-auth items-center gap-2">
              {currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>
                    {currentUser.name}
                  </span>
                  {onLogout && (
                    <button
                      onClick={onLogout}
                      style={{ ...ghostBtn, padding: '5px 10px', fontSize: 11 }}
                    >
                      Log out
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {onOpenAuth ? (
                    <>
                      <button onClick={onOpenAuth} style={ghostBtn}>
                        Log in
                      </button>
                      <button onClick={onOpenAuth} style={accentBtn}>
                        Register
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" style={ghostBtn}>
                        Log in
                      </Link>
                      <Link href="/register" style={accentBtn}>
                        Register
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              className="nav-hamburger-btn"
              onClick={() => setMobileMenuOpen((o) => !o)}
              style={{
                ...iconBtn,
                color: mobileMenuOpen ? 'var(--accent)' : 'var(--text)',
                borderColor: mobileMenuOpen ? 'var(--accent)' : 'var(--border)',
                background: mobileMenuOpen ? 'var(--accent-glow)' : 'transparent',
              }}
              title="Menu"
              type="button"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Drawer */}
        {mobileMenuOpen && (
          <div
            className="nav-drawer-tablet-mobile"
            style={{
              background: theme === 'dark' ? 'rgba(10,18,34,0.98)' : 'rgba(238,242,251,0.98)',
              backdropFilter: 'blur(24px)',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              padding: '18px 20px 24px',
              animation: 'fadeUp 0.2s ease both',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--muted)', fontWeight: 700 }}>
                Navigation & Catalog
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 8,
              }}
            >
              <Link
                href="/"
                style={{
                  ...mobileNavLink,
                  color: isHome ? 'var(--accent)' : 'var(--text)',
                  background: isHome ? 'var(--accent-glow)' : 'var(--bg2)',
                  borderColor: isHome ? 'var(--accent)' : 'var(--border)',
                  fontWeight: isHome ? 700 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 16 }}>🏠</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Home</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>Highlights & Motto</div>
                </div>
              </Link>

              <Link
                href="/movies"
                style={{
                  ...mobileNavLink,
                  color: isMovies ? 'var(--accent)' : 'var(--text)',
                  background: isMovies ? 'var(--accent-glow)' : 'var(--bg2)',
                  borderColor: isMovies ? 'var(--accent)' : 'var(--border)',
                  fontWeight: isMovies ? 700 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 16 }}>🎬</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>All Recaps</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>Browse movies & series</div>
                </div>
              </Link>

              <Link
                href="/#dilemma"
                style={{
                  ...mobileNavLink,
                  color: 'var(--text)',
                  background: 'var(--bg2)',
                  borderColor: 'var(--border)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 16 }}>⚠️</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>The Dilemma</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>Why YouTube search fails</div>
                </div>
              </Link>

              <Link
                href="/#how-it-works"
                style={{
                  ...mobileNavLink,
                  color: 'var(--text)',
                  background: 'var(--bg2)',
                  borderColor: 'var(--border)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 16 }}>⚡</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>How It Works</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>3-step selection model</div>
                </div>
              </Link>

              <Link
                href="/#creators"
                style={{
                  ...mobileNavLink,
                  color: 'var(--text)',
                  background: 'var(--bg2)',
                  borderColor: 'var(--border)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 16 }}>🎙️</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Creators</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>Channels we index</div>
                </div>
              </Link>
            </div>

            {/* Mobile Auth actions */}
            <div style={{ display: 'flex', gap: 8, marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              {currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>
                    Signed in as {currentUser.name}
                  </span>
                  {onLogout && (
                    <button onClick={onLogout} style={ghostBtn}>
                      Log out
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" style={{ ...ghostBtn, flex: 1, textAlign: 'center' }}>
                    Log in
                  </Link>
                  <Link href="/register" style={{ ...accentBtn, flex: 1, textAlign: 'center' }}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

const navBtn: React.CSSProperties = {
  textDecoration: 'none',
  padding: '6px 14px',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: '1px solid transparent',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
};

const iconBtn: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  width: 36,
  height: 36,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: 16,
  transition: 'all 0.2s ease',
};

const ghostBtn: React.CSSProperties = {
  textDecoration: 'none',
  background: 'transparent',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '6px 14px',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const accentBtn: React.CSSProperties = {
  textDecoration: 'none',
  background: 'var(--accent)',
  border: '1px solid transparent',
  color: '#fff',
  padding: '6px 14px',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 0 16px var(--accent-glow)',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const mobileNavLink: React.CSSProperties = {
  textDecoration: 'none',
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid var(--border)',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 0.2s ease',
};
