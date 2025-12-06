const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema');
const errorHandler = require('../Middlewares/errorMiddleware');
const authTokenHandler = require('../Middlewares/checkAuthToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rahatazmain@gmail.com',
        pass: 'leoesygcqgalobwn',
    },
});

// Helper function to structure responses
function createResponse(ok, message, data = null) {
    return { ok, message, data };
}


router.get('/test', async (req, res) => {
    res.json({ message: 'Auth API is working' });
});

router.post('/register', async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            weightInKg,
            heightInCm,
            gender,
            dob,
            goal,
            activityLevel,
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json(createResponse(false, 'Email already exists'));
        }
        const date = new Date(dob);
        const newUser = new User({
            name,
            email,
            password, // ✅ Pass plain password - schema will hash it
            weight: [
                {
                    weight: weightInKg,
                    unit: 'kg',
                    date: Date.now(),
                },
            ],
            height: [
                {
                    height: heightInCm,
                    unit: 'cm',
                    date: Date.now(),
                },
            ],
            gender,
            dob: date.toString(),
            goal,
            activityLevel,
        });

        const response = await newUser.save();
        if(!response){
            console.log("Failed to upload to db");
            res.status(400).json(createResponse(false,"Internal Server Error. Failed to Register"));
        }

        res.status(201).json(createResponse(true, 'User registered successfully'));
    } catch (err) {
        next(err);
    }
});
