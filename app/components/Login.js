"use client"; // Ensure the component is client-side

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push("/");
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <div className="form-container border bg-white mx-5 text-center">
      <img src="svg/logo.png" alt="logo" />
      <form onSubmit={handleSubmit}>
        <input
          className="px-3 py-2 bg-white text-dark w-100 my-2 border"
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className="px-3 py-2 bg-white text-dark w-100 my-2 border"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button
          className="btn mt-2 btn-primary w-100"
          type="submit"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Logging in..." : "Log In"} {/* Conditionally render button text */}
        </button>
        <button className="btn mt-2 btn-outline-dark w-100">
          Continue With Google 
        </button>
      </form>
      <div className='text-danger mt-3'>{message}</div>
      <div className="mt-4">
        <p>
          Do not have an account? <Link href='/signup' className="text-primary text-decoration-none fw-bold">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
