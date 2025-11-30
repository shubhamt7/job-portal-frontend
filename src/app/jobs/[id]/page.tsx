'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Job {
  id: number;
  title: string;
  description: string;
  companyName: string;
  city: string;
  country: string;
  salaryRange: string;
  experience: string;
  postedOn : string;
}

export default function JobDetails() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`https://job-portal-backend-production-049a.up.railway.app/api/articles/${id}`)
      .then(res => setJob(res.data))
      .catch(err => console.error('Error fetching job:', err));
  }, [id]);

  if (!job) return <p>Loading...</p>;

  const formattedDate = new Date(job.postedOn).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '20px',
    maxWidth: '600px',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  return (
    <div style={cardStyle}>
      <h1>{job.title}</h1>
      <h3>{job.companyName}</h3>
      <p>{job.description}</p>
      <p><strong>Location:</strong> {job.city}, {job.country}</p>
      <p><strong>Experience:</strong> {job.experience}</p>
      <p><strong>Salary:</strong> {job.salaryRange}</p>
      <p><strong>Posted on:</strong> {formattedDate}</p>
    </div>
  );
}
