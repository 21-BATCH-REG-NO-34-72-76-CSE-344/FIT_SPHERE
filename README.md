🏋️‍♂️ FITSPHERE
A Comprehensive MERN Stack Fitness Tracker

FITSPHERE is a responsive, interactive, and user-friendly fitness tracking platform designed to help users monitor their daily health statistics and improve overall well-being. In today's fast-paced lifestyle, FITSPHERE solves the challenge of maintaining a healthy routine by unifying calorie intake, water consumption, physical activity, and sleep tracking into a single dashboard.

Table of Contents
 Key Features

 System Architecture

 Technology Stack

 Installation & Setup

 Project Structure

 API Endpoints

 Team & Course Info
 

  Key Features
FITSPHERE goes beyond simple logging by integrating visualization and planning tools:


 Secure Authentication: Robust user registration and login utilizing JWT (JSON Web Tokens) for stateless session management and bcrypt for secure password hashing.

 Comprehensive Health Dashboard: A unified view to track:

Calories: Log intake vs. burn.

Hydration: Water consumption tracker.

Sleep: Monitor sleep patterns.


Activity: Daily step counter.



Smart Recommendations: An intelligent engine that provides personalized exercise routines and ideal calorie intake suggestions based on your body metrics.

 Gym Visualizer: A unique, interactive visual interface allowing users to virtually preview and plan gym workout routines before hitting the gym.



Data Analytics: Interactive graphs and charts powered by Chart.js to visualize progress over days, weeks, and months.

System Architecture
The application follows a Monolithic MVC (Model-View-Controller) pattern adapted for the MERN stack:

Client Layer (React + TypeScript): Handles the UI, state management, and visualization logic.

API Layer (Express.js): RESTful API that processes requests, handles authentication middleware, and manages business logic.

Data Layer (MongoDB): NoSQL database storing user profiles, health logs, and workout plans.


Project Structure

FITSPHERE/
├── config/             # Database connection logic
├── controllers/        # Request logic (Auth, Health logs)
├── models/             # Mongoose schemas (User, Activity, Sleep)
├── routes/             # API Routes
├── middleware/         # Auth verification & Error handling
├── client/             # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Dashboard, Login, Gym Visualizer
│   │   ├── utils/      # API helpers
│   │   └── App.tsx     # Main entry point
├── .gitignore
├── package.json
└── README.md


Team & Course Info
This project was developed for CSE-344 during the 2021-2022 session.


Team Members: 

Shafiuazzaman Akash (ID: 2021331034)

Rahat Azmain Rupak (ID: 2021331072)

Rejvi Ahmed (ID: 2021331076)
