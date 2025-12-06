"use client"
import React, {useEffect ,useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import logo from './create a logo name as _FITSPHERE_ that i can use in a fitness app-Picsart-BackgroundRemover.jpg'
import './Navbar.css'
const Navbar = () => {
    const [isAminAuthenticated, setIsAdminAuthenticated]=useState(false);
  return (
    <div className='navbar'>

      <Image src={logo} alt='Logo' width={100} className='logo'/>
      <div className='adminlinks'>
        {isAminAuthenticated?(
          <>
            <Link href={'/pages/addworkout'}>Add Workout</Link>

          </>
        ):(
          <>

          <Link href='/adminauth/login'>Login</Link>
          <Link href='/adminauth/register'>Signout</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
