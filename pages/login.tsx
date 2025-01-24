/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../app/services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      const response = await api.post('/user/login', { username, password });

      if (response.status === 200) {
        localStorage.setItem('userId', response.data.userId);
        alert('Login successful!');
        router.push('/shopping-list');  // Redirect to shopping list page
      } else {
        alert('Invalid username or password.');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      alert(`Login failed. ${error.response?.data || 'Please try again.'}`);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don not have an account? <a href="/signup">Sign up here</a></p>
    </div>
  );
}
