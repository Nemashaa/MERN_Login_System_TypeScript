// components/Login.tsx
import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import MainLayout from '../layouts/MainLayout';
import { LoginData, AuthResponse } from '../types/userTypes'; // Import centralized types
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const { setUser } = useAuthStore();

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginData;

    try {
      const { data: responseData }: AxiosResponse<AuthResponse> = await axios.post('/login', { email, password });

      if (responseData.error) {
        toast.error(responseData.error);
      } else if (responseData.user) {
        setUser(responseData.user);
        setLoginData({ email: '', password: '' });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <MainLayout>
      <div className="login-page">
        <form className="form" onSubmit={loginUser}>
          <h2>Login</h2>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email..."
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            onKeyDown={handleKeyDown}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password..."
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            onKeyDown={handleKeyDown}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </MainLayout>
  );
}