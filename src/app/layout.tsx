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
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/articles" onClick={() => setMenuOpen(false)}>
          ⚡️ News ⚡️
        </Link>

        {user?.isAdmin && (
          <Link href="/add-job" onClick={() => setMenuOpen(false)}>Add Job</Link>
        )}

        {user ? (
          <>
            <Link href="/add-article" onClick={() => setMenuOpen(false)}>Add Article</Link>
            <button className="logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
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
          height: 60px;
          padding: 0 20px;
          background-color: #1e40af;
          color: white;
        }

        .logo img {
          max-height: 50px;
          width: auto;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }

        .nav-links a:hover {
          color: #facc15;
        }

        .logout {
          background-color: #dc2626;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          font-weight: 500;
        }

        .logout:hover {
          background-color: #b91c1c;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 4px;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background-color: white;
          border-radius: 2px;
        }

        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 60px;
            right: 0;
            background-color: #1e40af;
            flex-direction: column;
            width: 200px;
            padding: 15px;
            display: none;
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
              padding: 20px;
              background-color: #f5f5f5;
              min-height: calc(100vh - 60px);
            }

            .container {
              max-width: 1200px;
              margin: 0 auto;
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
              justify-content: center;
            }

            /* Example card style if you want default for jobs/articles */
            .card {
              background-color: white;
              border-radius: 10px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              padding: 20px;
              width: 300px;
              display: flex;
              flex-direction: column;
              gap: 10px;
            }
          `}</style>
        </AuthProvider>
      </body>
    </html>
  );
}
