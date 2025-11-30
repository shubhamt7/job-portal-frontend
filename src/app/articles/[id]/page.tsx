'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ArticleVotes from '../../components/ArticleVotes';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  createdOn: string;
  photoUrl?: string;
}

export default function ArticleDetailPage() {
  const params = useParams(); // expects /articles/[id]
  const articleId = params.id;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!articleId) return;

    axios.get(`https://job-portal-backend-production-049a.up.railway.app/api/articles/${articleId}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
  }, [articleId]);

  if (!article) return <p className="text-center mt-20 text-gray-500 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 py-10 sm:py-20">
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12">
        <button 
          className="mb-6 text-blue-500 hover:underline font-semibold"
          onClick={() => window.history.back()}
        >
          &larr; Back
        </button>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center sm:text-left">{article.title}</h1>

        <div className="text-center sm:text-left mb-6">
          <p className="text-gray-600 italic">{article.author || 'Anonymous'}</p>
          <p className="text-gray-400 text-sm">
            Published on {new Date(article.createdOn).toLocaleDateString()}
          </p>
        </div>

        {article.photoUrl && (
          <img 
            src={article.photoUrl} 
            alt={article.title} 
            className="w-full max-h-[500px] object-cover rounded-xl mb-6"
          />
        )}

        <div 
          className="text-gray-700 leading-relaxed text-base sm:text-lg text-center sm:text-left mb-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <ArticleVotes articleId={article.id} />
      </div>
    </div>
  );
}
