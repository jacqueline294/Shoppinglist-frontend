/* eslint-disable @typescript-eslint/no-unused-vars */

import { useForm } from 'react-hook-form';
import { api } from '../services/api';

type ShoppingItemData = {
  itemName: string;
  quantity: number;
  userId: number;
};

export default function ShoppingListForm() {
  const { register, handleSubmit, reset } = useForm<ShoppingItemData>();

  const onSubmit = async (data: ShoppingItemData) => {
    try {
      await api.post('/shopping-list', data);
      alert('Item added successfully');
      reset();
    } catch (error) {
      alert('Failed to add item');
    }
  };

  return (
    <div>
      <h2>Add Shopping Item</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('itemName', { required: true })} placeholder="Item Name" />
        <input {...register('quantity', { required: true })} type="number" placeholder="Quantity" />
        <input {...register('userId', { required: true })} type="number" placeholder="User ID" />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
