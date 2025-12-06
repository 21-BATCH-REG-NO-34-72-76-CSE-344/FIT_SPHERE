
"use client"
import React, { useEffect, useState } from 'react'
import logo from '@/assets/create a logo name as _FITSPHERE_ that i can use in a fitness app-Picsart-BackgroundRemover.jpg'
import { IoIosBody } from 'react-icons/io'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import AuthPopup from '../AuthPopup/AuthPopup'

const Navbar = () => {
    const [isloggedin, setIsloggedin] = useState<boolean>(false)
    const [showpopup, setShowpopup] = useState<boolean>(false)

    const checklogin = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
                method: 'POST',
                credentials: 'include',
            });
            const data = await res.json();
            console.log('Check login response:', data); // ✅ Debug log
            setIsloggedin(data.ok);
        } catch (err) {
            console.error("Check login error:", err);
            setIsloggedin(false);
        }
    }

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            setIsloggedin(false);
            console.log('Logged out successfully'); // ✅ Debug log
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    // ✅ NEW FUNCTION: Handle successful login
    const handleSuccessfulLogin = () => {
        console.log('Login successful, updating navbar state'); // ✅ Debug log
        setIsloggedin(true);
        setShowpopup(false);
    }

    useEffect(() => {
        checklogin();
    }, []); // ✅ Removed showpopup dependency - we'll handle login state manually

    return (
        <nav>
            <Image src={logo} alt="Logo" />
            <Link href='/'>Home</Link>
            <Link href='/about'>About</Link>
            <Link href='/profile'><IoIosBody /></Link>

            {
                isloggedin ?
                    <button onClick={handleLogout}>Logout</button>
                    :
                    <button onClick={() => setShowpopup(true)}>Login</button>
            }

            {
                showpopup && (
                    <AuthPopup 
                        setShowpopup={setShowpopup} 
                        onLoginSuccess={handleSuccessfulLogin} // ✅ Pass callback
                    />
                )
            }
        </nav>
    )
}

export default Navbar
