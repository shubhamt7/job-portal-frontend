'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';

interface Props {
  articleId: number;
}

export default function ArticleVotes({ articleId }: Props) {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch existing votes on component mount
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await axios.get(`https://job-portal-backend-production-049a.up.railway.app/api/articles/${articleId}/votes`);
        setUpvotes(res.data.upvotes || 0);
        setDownvotes(res.data.downvotes || 0);
      } catch (err) {
        console.error('Error fetching votes:', err);
      }
    };

    fetchVotes();
  }, [articleId]);

  const handleVote = async (type: 'upvote' | 'downvote') => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://job-portal-backend-production-049a.up.railway.app/api/articles/${articleId}/vote?type=${type}`
      );
      setUpvotes(res.data.upvotes);
      setDownvotes(res.data.downvotes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 30px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '9999px', // pill shape
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, background-color 0.2s',
  } as const;

  const containerStyle = {
    display: 'flex',
    gap: '24px',
    marginTop: '20px',
  } as const;

  const hoverTransform = {
    transform: 'scale(1.1) translateY(-2px)',
  } as const;

  return (
    <div style={containerStyle}>
      {/* Upvote */}
      <button
        disabled={loading}
        onClick={() => handleVote('upvote')}
        style={{
          ...buttonStyle,
          backgroundColor: '#16a34a', // green
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
      >
        <HandThumbUpIcon style={{ width: '20px', height: '20px' }} />
        <span style={{ fontSize: '18px' }}>{upvotes}</span>
      </button>

      {/* Downvote */}
      <button
        disabled={loading}
        onClick={() => handleVote('downvote')}
        style={{
          ...buttonStyle,
          backgroundColor: '#dc2626', // red
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
      >
        <HandThumbDownIcon style={{ width: '20px', height: '20x' }} />
        <span style={{ fontSize: '18px' }}>{downvotes}</span>
      </button>
    </div>
  );
}
