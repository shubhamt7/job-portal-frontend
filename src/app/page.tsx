'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  companyName: string;
  city: string;
  country: string;
  postedOn: string;
  address: string;
  experience: string;
  salaryRange: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios.get('https://job-portal-backend-production-049a.up.railway.app/api/jobs')
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  const gridStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '20px',
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textDecoration: 'none',
    color: 'inherit',
  };

  const cardHoverStyle: React.CSSProperties = {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Available Jobs</h1>
      <div style={gridStyle}>
        {jobs.map(job => (
          <Link href={`/jobs/${job.id}`} key={job.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              style={cardStyle}
              onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <h3 style={{ margin: 0 }}>{job.title}</h3>
              <p style={{ margin: 0, fontWeight: 500 }}>{job.companyName}</p>
              <p style={{ margin: 0 }}>{job.city}, {job.country}</p>
              <p style={{ margin: 0 }}>Salary: {job.salaryRange}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>Experience: {job.experience}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
