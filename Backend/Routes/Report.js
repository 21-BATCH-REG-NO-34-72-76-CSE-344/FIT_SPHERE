const express = require('express');
const router = express.Router();
const authTokenHandler = require('../Middlewares/checkAuthToken');
const jwt = require('jsonwebtoken');
const errorHandler = require('../Middlewares/errorMiddleware');
const request = require('request');
const User = require('../Models/UserSchema');
require('dotenv').config();


function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data,
    };
}


router.get('/test', authTokenHandler, async (req, res) => {
    res.json(createResponse(true, 'Test API works for calorie intake report'));
});

router.post('/addcalorieintake', authTokenHandler, async (req, res) => {
    const { item, date, quantity, quantitytype } = req.body;
    if (!item || !date || !quantity || !quantitytype) {
        return res.status(400).json(createResponse(false, 'Please provide all the details'));
    }
    let qtyingrams = 0;
    if (quantitytype === 'g') {
        qtyingrams = quantity;
    }
    else if (quantitytype === 'kg') {
        qtyingrams = quantity * 1000;
    }
    else if (quantitytype === 'ml') {
        qtyingrams = quantity;
    }
    else if (quantitytype === 'l') {
        qtyingrams = quantity * 1000;
    }
    else {
        return res.status(400).json(createResponse(false, 'Invalid quantity type'));
    }

    var query = item;
    request.get({
        url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
        headers: {
            'X-Api-Key': process.env.NUTRITION_API_KEY,
        },
    }, async function (error, response, body) {
        if (error) return console.error('Request failed:', error);
        else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        else {
            // body :[ {
            //     "name": "rice",
            //     "calories": 127.4,
            //     "serving_size_g": 100,
            //     "fat_total_g": 0.3,
            //     "fat_saturated_g": 0.1,
            //     "protein_g": 2.7,
            //     "sodium_mg": 1,
            //     "potassium_mg": 42,
            //     "cholesterol_mg": 0,
            //     "carbohydrates_total_g": 28.4,
            //     "fiber_g": 0.4,
            //     "sugar_g": 0.1
            // }]

            body = JSON.parse(body);
            let calorieIntake = (body[0].calories / body[0].serving_size_g) * parseInt(qtyingrams);
            const userId = req.userId;
            const user = await User.findOne({ _id: userId });
            user.calorieIntake.push({
                item,
                date: new Date(date),
                quantity,
                quantitytype,
                calorieIntake: parseInt(calorieIntake)
            })

            await user.save();
            res.json(createResponse(true, 'Calorie intake added successfully'));
        }
    });

})
