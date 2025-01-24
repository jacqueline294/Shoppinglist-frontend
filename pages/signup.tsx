/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../app/services/api';
import '../app/globals.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await api.post('/user', { username, password });

      if (response.status === 201) {
        alert('Signup successful! Please log in.');
        router.push('/login');
      } else {
        setErrorMessage('Unexpected response from server. Please try again.');
      }
    } catch (error: any) {
      console.error('Signup failed:', error);

      if (error.response) {
        setErrorMessage(error.response.data || 'Signup failed. Please try again.');
      } else if (error.request) {
        setErrorMessage('No response from the server. Please check your network.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
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
            className="input-field"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
        <p>
          Already have an account? <a href="/login" className="link">Log in here</a>
        </p>
      </div>
    </div>
  );
}
