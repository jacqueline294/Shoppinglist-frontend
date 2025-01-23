/* eslint-disable @typescript-eslint/no-unused-vars */

import { useForm } from 'react-hook-form';
import { api } from '../services/api';

type UserFormData = {
  username: string;
  password: string;
};

export default function UserForm() {
  const { register, handleSubmit, reset } = useForm<UserFormData>();

  const onSubmit = async (data: UserFormData) => {
    try {
      await api.post('/users', data);
      alert('User registered successfully');
      reset();
    } catch (error) {
      alert('Failed to register user');
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username', { required: true })} placeholder="Username" />
        <input {...register('password', { required: true })} type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
