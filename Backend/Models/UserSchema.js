const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    weight: [
        {
            weight: {
                type: Number,
                required: true,
            },
            unit: {  // ✅ ADD THIS FIELD
                type: String,
                required: true,
                default: 'kg'
            },
            date: {
                type: Date,
                required: true,
            },
        }
    ],
    height: [
        {
            height: {
                type: Number,
                required: true,
            },
            unit: {  // ✅ ADD THIS FIELD
                type: String,
                required: true,
                default: 'cm'
            },
            date: {
                type: Date,
                required: true,
            },
        }
    ],
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    goal: {
        type: String,
        required: true,
    },
