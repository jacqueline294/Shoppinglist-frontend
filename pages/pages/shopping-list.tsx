
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

type ShoppingItem = {
  id: number;
  itemName: string;
  quantity: number;
  user: { username: string };
};

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/shopping-list')
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching shopping items:', error));
  }, []);

  return (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              {item.itemName} - {item.quantity} (User: {item.user.username})
            </li>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </ul>
    </div>
  );
}
