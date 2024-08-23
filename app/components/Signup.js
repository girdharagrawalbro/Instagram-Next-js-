"use client"; // Ensure client-side rendering

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const router = useRouter(); // Use the Next.js 14 useRouter

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        localStorage.setItem('token', data.token);
        router.push("/"); // Navigate to main page with userId
      } else {
        const errorData = await response.json();
        setMessage(errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container border bg-white mx-5 text-center">
      <img src="svg/logo.png" alt="logo" />
      <form onSubmit={handleSubmit}>
        <input
          className="px-3 py-2 bg-white text-dark w-100 my-2 border"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="px-3 py-2 bg-white text-dark w-100 my-2 border"
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <input
          className="px-3 py-2 bg-white text-dark w-100 my-2 border"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="px-3 py-2 bg-white text-dark w-100 my-2 border"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="btn mt-2 btn-primary w-100" type="submit">
          Sign Up
        </button>
        <button className="btn mt-2 btn-outline-dark w-100">
          Continue With Google 
        </button>
      </form>
      <div className='text-danger mt-3'>{message}</div>

      <div className="mt-4">
        <p>
          Have an account? <a href="/login" className="text-primary text-decoration-none fw-bold">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
