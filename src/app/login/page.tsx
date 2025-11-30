'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import React from 'react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState('');

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'shubham123') {
      login({ name: 'Shubham', isAdmin: true });
      router.push('/');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handle} style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // center vertically
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '350px',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column', // TS-safe
    rowGap: '20px',          // use rowGap instead of gap for TS
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '22px',
    fontWeight: 600,
  },
  input: {
    padding: '12px',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    border: 'none',
    backgroundColor: '#1e40af',
    color: 'white',
    borderRadius: 6,
    fontSize: 16,
    cursor: 'pointer',
    transition: '0.2s',
  },
};
