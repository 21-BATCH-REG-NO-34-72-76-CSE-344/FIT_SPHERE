"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      toast.error('Please fill in all fields', {
        position: 'top-center',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.ok || response.ok) {
        
        localStorage.setItem('isLoggedIn','true');

        console.log('Admin login successful', data);
        toast.success('Login Successful', {
          position: 'top-center',
        });
        
        // Store token if provided
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
        }
        
        router.push('/dashboard'); // Adjust path as needed
        
      } else {
        console.error('Admin login failed', data.message || response.statusText);
        toast.error(data.message || 'Login Failed', {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('An error occurred during login', error);
      toast.error('Login Error. Please check your connection.', {
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="formpage">
      <h2>Admin Login</h2>
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      
      <button 
        onClick={handleLogin}
        disabled={isLoading}
        style={{
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      
      <p>
        Don't have an account?{' '}
        <a 
          href="/adminauth/register" 
          style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Sign up here
        </a>
      </p>
      
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
