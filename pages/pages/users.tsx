
"use client";

import React from 'react';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState<{ id: number; username: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/user')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
}
