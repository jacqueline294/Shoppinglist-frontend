"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '../app/services/api';

type ShoppingItem = {
  id: number;
  itemName: string;
  quantity: number;
};

export default function ShoppingList() {
  const router = useRouter();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

  // Redirect if user is not logged in
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
    } else {
      fetchShoppingList();
    }
  }, []);

  // Fetch shopping list
  const fetchShoppingList = async () => {
    try {
      const response = await api.get('/shopping-list');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to load shopping list:', error);
    }
  };

  // Add or update item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/shopping-list/${editingItem.id}`, { itemName, quantity });
        setEditingItem(null);
      } else {
        await api.post('/shopping-list', { itemName, quantity, userId: localStorage.getItem('userId') });
      }
      setItemName('');
      setQuantity(1);
      fetchShoppingList();
    } catch (error) {
      console.error('Error adding/updating item:', error);
    }
  };

  // Delete item
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/shopping-list/${id}`);
      fetchShoppingList();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle edit action
  const handleEdit = (item: ShoppingItem) => {
    setItemName(item.itemName);
    setQuantity(item.quantity);
    setEditingItem(item);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Your Shopping List</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter item"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        <button type="submit">{editingItem ? 'Update Item' : 'Add Item'}</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} style={{ marginBottom: '10px' }}>
              {item.itemName} - {item.quantity}
              <button onClick={() => handleEdit(item)} style={{ marginLeft: '10px' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))
        ) : (
          <p>No items found</p>
        )}
      </ul>

      <button onClick={handleLogout} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
}
