'use client';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddJob() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    city: '',
    country: '',
    address: '',
    companyName: '',
    experience: '',
    salaryRange: '',
    category: ''
  });

  useEffect(() => {
    const auth = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
    if (auth !== 'true') {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('https://job-portal-backend-production-049a.up.railway.app/api/jobs', form);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add New Job</h2>
      {Object.keys(form).map(key => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={(form as any)[key]}
          onChange={handleChange}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
