'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  createdOn: string;
  photoUrl?: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  function formatDateWithSuffix(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // e.g., Oct
    const year = date.getFullYear();

    // Determine suffix
    const suffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';

    return `${month} ${day}${suffix}, ${year}`;
  }


  useEffect(() => {
    axios.get('https://job-portal-backend-production-049a.up.railway.app/api/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {articles.map(article => (
        <Link 
          href={`/articles/${article.id}`} 
          key={article.id} 
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '25px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            className="hover:shadow-lg hover:scale-[1.02]"
          >
            {/* Optional photo */}
            {article.photoUrl && (
              <img
                src={article.photoUrl}
                alt={article.title}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                }}
              />
            )}

            <div style={{ padding: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{article.title}</h2>
              <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '15px' }}>
                By {article.author || 'Anonymous'} on <strong>{formatDateWithSuffix(article.createdOn)}</strong>
              </p>
              
              <span style={{ color: '#1e90ff', fontWeight: '500' }}>Read now...</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
