/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../app/services/api';
import '../app/globals.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await api.post('', { username, password });  // Ensure the correct endpoint
      alert('Signup successful! Please log in.');
      router.push('/login');
    } catch (error: any) {
      alert(`Signup failed: ${error.response?.data || 'Please try again.'}`);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login" className="link">Log in here</a>
        </p>
      </div>
    </div>
  );
}
