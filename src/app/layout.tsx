'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link href="/" legacyBehavior>
          <a onClick={() => setMenuOpen(false)}>Home</a>
        </Link>
        <Link href="/articles" legacyBehavior>
          <a onClick={() => setMenuOpen(false)}>⚡️ News ⚡️</a>
        </Link>

        {user?.isAdmin && (
          <Link href="/add-job" legacyBehavior>
            <a onClick={() => setMenuOpen(false)}>Add Job</a>
          </Link>
        )}

        {user ? (
          <>
            <Link href="/add-article" legacyBehavior>
              <a onClick={() => setMenuOpen(false)}>Add Article</a>
            </Link>
            <button className="logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link href="/login" legacyBehavior>
            <a onClick={() => setMenuOpen(false)}>Login</a>
          </Link>
        )}
      </div>


      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
          padding: 0 30px;
          background-color: #1e40af;
          color: white;
          font-family: 'Segoe UI', Roboto, sans-serif;
          font-weight: 600;
          position: relative;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .logo img {
          max-height: 50px;
          width: auto;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nav-links a {
          color: #ffffff !important; /* force white */
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          text-transform: uppercase;
          position: relative;
          padding: 4px 0;
          transition: color 0.2s ease-in-out;
        }

        /* Animated underline on hover */
        .nav-links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 0;
          height: 2px;
          background-color: #facc15;
          transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-links a:hover {
          color: #facc15;
        }

        .logout {
          background-color: #dc2626;
          border: none;
          padding: 8px 14px;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .logout:hover {
          background-color: #b91c1c;
          transform: translateY(-2px);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 25px;
          height: 18px;
          cursor: pointer;
        }

        .hamburger span {
          display: block;
          height: 3px;
          background-color: white;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 70px;
            right: 0;
            background-color: #1e40af;
            flex-direction: column;
            width: 220px;
            padding: 15px;
            border-radius: 0 0 8px 8px;
            display: none;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          }

          .nav-links.active {
            display: flex;
          }

          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="content">
            <div className="container">{children}</div>
          </main>

          <style jsx>{`
            .content {
              padding: 30px 20px;
              background-color: #f0f2f5;
              min-height: calc(100vh - 70px);
              transition: background-color 0.3s ease;
            }

            .container {
              max-width: 1200px;
              margin: 0 auto;
              display: flex;
              flex-wrap: wrap;
              gap: 25px;
              justify-content: center;
            }

            .card {
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 6px 20px rgba(0,0,0,0.08);
              padding: 20px;
              width: 300px;
              display: flex;
              flex-direction: column;
              gap: 15px;
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }

            .card:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            }
          `}</style>
        </AuthProvider>
      </body>
    </html>
  );
}
