'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill (to prevent SSR issues)
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return RQ;
  },
  { ssr: false, loading: () => <p>Loading editor...</p> }
);


export default function AddArticle() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://job-portal-backend-production-049a.up.railway.app/api/articles', {
        title,
        author,
        content,
        photoUrl
      });
      alert('✅ Article added successfully!');
      setTitle('');
      setAuthor('');
      setContent('');
      setPhotoUrl('');
    } catch (err) {
      console.error(err);
      alert('❌ Error adding article');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Add New Article</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

        <input
          type="text"
          placeholder="Photo URL"
          value={photoUrl}
          onChange={e => setPhotoUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Write your article here..."
          style={{ height: '300px', marginBottom: '20px' }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Publish Article
        </button>
      </form>
    </div>
  );
}
