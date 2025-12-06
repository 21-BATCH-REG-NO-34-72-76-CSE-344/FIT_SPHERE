"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import "./admin_register.css";



const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router =useRouter()

const handleSignup = async () => {
  try {
    const response = await fetch(⁠ ${process.env.NEXT_PUBLIC_BACKEND_API}/admin/register ⁠, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    });
