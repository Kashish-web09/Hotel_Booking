🏨 Hotel Booking Management System

A full-stack hotel booking application built with Node.js, Express.js, MongoDB, Mongoose, and EJS.

The application provides separate workflows for Guests and Administrators, covering authentication, hotel and room management, room search, booking management, feedback, and admin dashboard analytics.

Project Status: Core functionality is implemented. Profile management, complete validation, security hardening, and final testing are currently being completed.

🚀 Key Features

👤 Guest

User registration and login

Forgot password and reset password

JWT-based authentication

Cookie-based session handling

Guest dashboard

Hotel search and hotel details

Room listing and room search/filtering

Room details

Create and manage bookings

View booking details and booking history

Cancel bookings

Submit feedback

About Us page

Guest profile — in progress

🛡️ Admin

Admin authentication and authorization

Admin dashboard

Hotel management

Room management

Room image upload

Booking management

Booking status updates

Feedback management

Feedback status updates

User overview

Dashboard statistics:

Total users

Total hotels

Total rooms

Total bookings

Total revenue

Recent bookings

Admin profile — in progress

🧰 Tech Stack

Layer

Technologies

Frontend

HTML5, CSS3, JavaScript, Bootstrap, EJS

Backend

Node.js, Express.js

Database

MongoDB, Mongoose

Authentication

JWT, Cookies, bcrypt

Validation

Express Validator

File Uploads

Multer

Logging

Winston

Configuration

dotenv

Development

Git, GitHub, npm

🏗️ Architecture

The application follows a feature-based architecture with separation of responsibilities between routes, middleware, controllers, repositories, and models.

Request Flow

Client Request
      ↓
    Route
      ↓
  Middleware
      ↓
  Controller
      ↓
  Repository
      ↓
 Mongoose Model
      ↓
   MongoDB

For protected resources:

Request
   ↓
JWT Authentication
   ↓
Authorization
   ↓
Controller
   ↓
Business / Database Logic
   ↓
MongoDB

This structure keeps authentication, routing, business logic, and database operations separated and easier to maintain.

📁 Project Structure

HOTEL_BOOKING/
│
├── config/
│   ├── mongoDb.js
│   └── mongoose.js
│
├── errorFile/
│   └── applicationLevelError.js
│
├── features/
│   ├── admin/
│   │   ├── adminAuth/
│   │   ├── adminDashboard/
│   │   ├── booking/
│   │   ├── contact/
│   │   ├── hotel/
│   │   └── rooms/
│   │
│   └── guest/
│       ├── booking/
│       ├── contact/
│       ├── dashboard/
│       ├── hotel/
│       ├── rooms/
│       └── userAuth/
│
├── middleware/
│   ├── adminJwtAuthMiddleware.js
│   ├── commonValidation.js
│   ├── fileUploadMiddleware.js
│   ├── jwtAuthMiddleware.js
│   └── loggerMiddleware.js
│
├── public/
│   └── css/
│       └── style.css
│
├── uploads/
│
├── views/
│   ├── admin/
│   ├── guest/
│   ├── layout/
│   │   ├── adminLayout.ejs
│   │   └── layout.ejs
│   └── partials/
│       ├── adminNavbar.ejs
│       ├── footer.ejs
│       └── navbar.ejs
│
├── logs/
│   ├── combined.log
│   └── error.log
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md

🔐 Authentication & Authorization

Authentication is implemented using JWT and HTTP cookies.

The application separates guest and admin access:

Guest
  ↓
User Authentication
  ↓
JWT
  ↓
Protected Guest Routes

Admin
  ↓
Admin Authentication
  ↓
Admin JWT
  ↓
Admin Authorization Middleware
  ↓
Protected Admin Routes

Example protected admin route:

app.use('/api/admin/hotel', adminUser, hotelRoutes);

Example protected guest route:

app.use('/api/guest/booking', currentUser, bookingRoutes);

Passwords are securely hashed before being stored using bcrypt.

🏨 Hotel & Room Management

Admin Workflow

Admin Login
    ↓
Admin Dashboard
    ↓
Manage Hotels
    ↓
Add / Manage Rooms
    ↓
Upload Room Images
    ↓
Manage Room Details

Room information includes properties such as:

Room number

Room type

Floor

Maximum guests

Bed type

Bed count

Price per night

Size

Amenities

Room images

Room status

AC availability

Balcony availability

Smoking policy

📅 Booking Workflow

The guest booking flow is:

Search Hotel
     ↓
View Hotel Details
     ↓
View Available Rooms
     ↓
Select Room
     ↓
Enter Booking Details
     ↓
Check Availability
     ↓
Create Booking
     ↓
View Booking Details
     ↓
Manage / Cancel Booking

A booking stores information such as:

User

Room

Check-in date

Check-out date

Number of guests

Price per night

Total amount

Booking status

📊 Admin Dashboard

The admin dashboard provides a centralized overview of application activity.

Dashboard Metrics

Total Users
Total Hotels
Total Rooms
Total Bookings
Total Revenue
Recent Bookings
Confirmed Bookings

This gives administrators a quick view of the current state of the hotel booking system.

💬 Feedback Management

Guests can submit feedback through the application.

Admins can:

View guest feedback

Review feedback details

Update feedback status

Guest
  ↓
Submit Feedback
  ↓
MongoDB
  ↓
Admin Dashboard
  ↓
Review / Update Status

🗄️ Database Design

MongoDB is used as the primary database with Mongoose for schema and data modeling.

Main entities include:

User
Hotel
Room
Booking
Feedback

Booking Relationship

User
  │
  └──── Booking
           │
           └──── Room
                  │
                  └──── Hotel

This allows the application to connect users, bookings, rooms, and hotels while keeping the data organized.

⚙️ Getting Started

Prerequisites

Make sure you have installed:

Node.js

npm

MongoDB / MongoDB Atlas

Git

1. Clone the repository

git clone <your-repository-url>

2. Navigate to the project

cd hotel_booking

3. Install dependencies

npm install

4. Configure environment variables

Create a .env file in the project root.

Example:

PORT=9090
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Add any additional email or application-specific variables required by your configuration.

5. Start the application

npm start

The application will run at:

http://localhost:9090

🧪 Validation & Error Handling

Validation is being implemented across the application's major workflows.

Examples include:

Required field validation

Email validation

Password validation

MongoDB ObjectId validation

Room price validation

Guest count validation

Booking date validation

Room type validation

Hotel information validation

Feedback validation

File upload validation

Important booking rules include:

Check-out > Check-in

Guests >= 1

Guests <= Room maximum capacity

Room price > 0

Room must be available for selected dates

🔒 Security

The application currently uses:

bcrypt password hashing

JWT authentication

Cookie-based authentication

Protected routes

Admin authorization middleware

Request validation

Environment variables

File upload middleware

Application logging

Planned security improvements include:

Rate limiting

Helmet

CSRF protection

Stronger cookie configuration

Additional input sanitization

More comprehensive authorization checks

📌 Future Improvements

Guest profile management

Admin profile management

Complete validation across all modules

Centralized error handling improvements

Automated testing

Security hardening

Email booking confirmation

Payment gateway integration

Hotel ratings and reviews

Production deployment

🎯 What I Learned

This project provided practical experience with:

Building full-stack web applications

Node.js and Express.js

REST API design

MongoDB and Mongoose

JWT authentication and authorization

Middleware design

MVC architecture

Feature-based project organization

Repository pattern

EJS server-side rendering

File uploads

Form validation

Error handling

Logging

Git and GitHub

👨‍💻 Author

Kashish Narang

Full Stack DeveloperJavaScript | Node.js | Express.js | MongoDB | React

📄 License

This project is developed for learning and portfolio purposes.
