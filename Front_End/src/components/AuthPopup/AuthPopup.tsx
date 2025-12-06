import React, { useState } from 'react'
import './AuthPopup.css'
import Image from 'next/image'
import logo from '@/assets/create a logo name as _FITSPHERE_ that i can use in a fitness app-Picsart-BackgroundRemover.jpg'
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import dayjs from 'dayjs';

//
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ToastContainer, toast } from 'react-toastify';

interface AuthPopupProps {
    setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
     onLoginSuccess?: () => void;
}


interface SignupFormData {
    name: String | null,
    email: String | null,
    password: String | null,
    weightInKg: Number | null,
    heightInCm: Number | null,
    goal: String | null,
    gender: String | null,
    dob: Date | null,
    activityLevel: String | null
}


const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup, onLoginSuccess }) => 
    {

    const [showSignup, setShowSignup] = React.useState<boolean>(false)
   const [signupformData, setSignupFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    weightInKg: null, // ✅ Changed from 0.0 to null for better validation
    heightInCm: null, // ✅ Changed from 0.0 to null for better validation
    goal: '',
    gender: '',
    dob: new Date(),
    activityLevel: ''
});
    const [loginformData, setLoginFormData] = useState({
        email: '',
        password: '',
    })
