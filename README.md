# 🏨 Hotel Booking Management System

A full-stack **Hotel Booking Management System** built using **Node.js, Express.js, MongoDB, Mongoose, and EJS**.

The application provides separate workflows for **Guests and Administrators**, including authentication, authorization, hotel and room management, room search, booking management, feedback management, profile management, email notifications, validation, logging, and an admin dashboard with business statistics.

---

## 🌐 Live Repository

[Hotel Booking Management System — GitHub Repository](https://github.com/Kashish-web09/Hotel_Booking?utm_source=chatgpt.com)

---

## 📌 Project Overview

Hotel Booking Management System is a full-stack web application designed to manage hotel operations and guest bookings.

The application has two primary user roles:

* 👤 **Guest**
* 🛡️ **Administrator**

Guests can browse hotels and rooms, search for suitable rooms, make and manage bookings, submit feedback, and manage their profiles.

Administrators can manage hotels, rooms, bookings, users, feedback, and their own profile through a dedicated admin dashboard.

The project also includes a reusable **email service using Nodemailer**, application logging using **Winston**, file uploads using **Multer**, and API documentation using **Swagger**.

> **Project Status:** Core functionality is implemented, including authentication, authorization, validation, email services, guest/admin profiles, hotel and room management, booking workflows, feedback management, logging, and admin dashboard features.

---

# 🚀 Features

## 👤 Guest Features

### Authentication

* User registration
* User login
* Logout
* JWT-based authentication
* Cookie-based authentication
* Forgot password
* Password reset through email
* Secure password hashing using bcrypt

### Hotel & Room

* Browse hotels
* Search hotels
* View hotel details
* View available rooms
* Search rooms
* Filter rooms
* View room details

### Booking

* Create bookings
* Check room availability
* Validate booking dates
* Validate guest capacity
* View booking details
* View booking history
* Manage bookings
* Cancel bookings
* Receive booking confirmation emails
* Receive booking status emails

### Profile

* View guest profile
* Update guest profile
* Change password
* Receive profile update email

### Feedback

* Submit feedback
* Receive feedback status updates

### Other

* About Us page
* Contact functionality

---

# 🛡️ Admin Features

## Authentication & Authorization

* Admin login
* Admin logout
* JWT-based authentication
* Cookie-based authentication
* Role-based authorization
* Protected admin routes

## Dashboard

The admin dashboard provides:

* Total Users
* Total Hotels
* Total Rooms
* Total Bookings
* Total Revenue
* Recent Bookings
* Confirmed Bookings

## Hotel Management

* Add hotels
* View hotels
* Update hotel information
* Manage hotel information

## Room Management

* Add rooms
* View rooms
* Update rooms
* Manage room details
* Upload room images
* Manage room status

## Booking Management

* View bookings
* View booking details
* Update booking status
* Manage guest bookings

## Feedback Management

* View guest feedback
* Review feedback
* Update feedback status
* Send feedback status notifications

## User Management

* View users
* Manage guest accounts

## Admin Profile

* View admin profile
* Update admin profile
* Change password
* Receive profile update email

---

# 📧 Email Service

The application includes a dedicated email service using **Nodemailer**.

The email functionality is separated into configuration and service layers:

```text
emailService/
├── emailConfig.js
└── emailService.js
```

The reusable email service handles multiple application workflows.

### ✉️ Available Email Notifications

#### 1. Welcome Email

Sent to a guest after successful registration.

```text
Guest Registration
       ↓
User Created
       ↓
Welcome Email
```

#### 2. New User Registration Notification

An email is sent to the admin when a new guest registers.

```text
New Guest Registration
       ↓
Admin Notification Email
```

#### 3. Booking Confirmation

Guests receive a confirmation email after their booking is confirmed.

```text
Booking Confirmed
       ↓
Booking Confirmation Email
```

#### 4. Booking Status Updates

Guests can receive emails based on booking status, including:

* Confirmed
* Completed
* Cancelled
* Other status updates

#### 5. Profile Update Notification

Guests and administrators can receive an email confirming that their profile has been updated.

#### 6. New Feedback Notification

The admin receives an email when a guest submits new feedback.

#### 7. Feedback Status Update

Guests receive an email when the status of their feedback is updated.

#### 8. Password Reset Email

When a guest requests a password reset, the application sends a password reset link through email.

```text
Forgot Password
       ↓
Generate Reset Token
       ↓
Create Reset URL
       ↓
Send Email
       ↓
User Opens Link
       ↓
Reset Password
```

The email service uses a reusable `sendEmail()` function to send HTML emails through the configured transporter.

---

# 🧰 Tech Stack

| Category          | Technologies                            |
| ----------------- | --------------------------------------- |
| Frontend          | HTML5, CSS3, JavaScript, Bootstrap, EJS |
| Backend           | Node.js, Express.js                     |
| Database          | MongoDB, Mongoose                       |
| Authentication    | JWT, Cookies, bcrypt                    |
| Validation        | Express Validator                       |
| Email             | Nodemailer                              |
| File Upload       | Multer                                  |
| Logging           | Winston                                 |
| Configuration     | dotenv                                  |
| API Documentation | Swagger                                 |
| Version Control   | Git, GitHub                             |

---

# 🏗️ Architecture

The project follows a **feature-based architecture** with separation of responsibilities between routes, middleware, controllers, repositories, and models.

## Request Flow

```text
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
```

## Protected Request Flow

```text
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
```

This architecture keeps routing, authentication, authorization, business logic, and database operations separated and maintainable.

---

# 📁 Project Structure

```text
HOTEL_BOOKING/
│
├── config/
│   ├── mongoDb.js
│   └── mongoose.js
│
├── emailService/
│   ├── emailConfig.js
│   └── emailService.js
│
├── errorFile/
│   └── applicationLevelError.js
│
├── features/
│   │
│   ├── admin/
│   │   ├── adminAuth/
│   │   ├── adminDashboard/
│   │   ├── booking/
│   │   ├── contact/
│   │   ├── hotel/
│   │   ├── profile/
│   │   └── rooms/
│   │
│   └── guest/
│       ├── booking/
│       ├── contact/
│       ├── dashboard/
│       ├── hotel/
│       ├── profile/
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
├── swagger.json
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

# 🔐 Authentication & Authorization

Authentication is implemented using **JWT, HTTP cookies, and bcrypt**.

The application separates Guest and Admin access through dedicated authentication and authorization middleware.

## Guest Authentication

```text
Guest
  ↓
Registration / Login
  ↓
JWT Generated
  ↓
JWT Stored in Cookie
  ↓
Authentication Middleware
  ↓
Protected Guest Routes
```

## Admin Authentication

```text
Admin
  ↓
Admin Login
  ↓
Admin JWT Generated
  ↓
JWT Stored in Cookie
  ↓
Admin Authentication Middleware
  ↓
Role Authorization
  ↓
Protected Admin Routes
```

Passwords are hashed using **bcrypt** before being stored in MongoDB.

### Protected Admin Route

```js
app.use('/api/admin/hotel', adminUser, hotelRoutes);
```

### Protected Guest Route

```js
app.use('/api/guest/booking', currentUser, bookingRoutes);
```

---

# 👤 Profile Management

Both Guest and Admin users have dedicated profile functionality.

## Guest Profile

Guests can:

* View profile
* Update profile details
* Change password
* Manage account information
* Receive profile update notification emails

## Admin Profile

Administrators can:

* View admin profile
* Update profile details
* Change password
* Manage administrator account information
* Receive profile update notification emails

---

# 🏨 Hotel & Room Management

Administrators can manage hotel and room information through the admin panel.

## Admin Workflow

```text
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
```

## Room Information

Rooms support information such as:

* Room number
* Room type
* Floor
* Maximum guests
* Bed type
* Bed count
* Price per night
* Room size
* Amenities
* Room images
* Room status
* AC availability
* Balcony availability
* Smoking policy
* Room description

## Room Status

```text
Available
Maintenance
Cleaning
```

---

# 📅 Booking Workflow

The guest booking workflow is:

```text
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
Validate Booking
     ↓
Check Room Availability
     ↓
Create Booking
     ↓
View Booking Details
     ↓
Manage / Cancel Booking
```

## Booking Information

A booking contains:

* User
* Room
* Check-in date
* Check-out date
* Number of guests
* Price per night
* Total amount
* Booking status

## Booking Status

```text
Pending
Confirmed
Cancelled
Completed
```

---

# 💬 Feedback Management

Guests can submit feedback through the application.

Administrators can:

* View guest feedback
* Review feedback
* Update feedback status
* Notify guests about feedback status changes

## Feedback Flow

```text
Guest
  ↓
Submit Feedback
  ↓
Validation
  ↓
MongoDB
  ↓
Admin Dashboard
  ↓
Review / Update Status
  ↓
Guest Notification Email
```

---

# 📊 Admin Dashboard

The admin dashboard provides a centralized overview of application activity.

## Dashboard Metrics

```text
┌──────────────────────────────┐
│ Total Users                  │
│ Total Hotels                 │
│ Total Rooms                  │
│ Total Bookings               │
│ Total Revenue                │
│ Recent Bookings              │
│ Confirmed Bookings           │
└──────────────────────────────┘
```

This allows administrators to monitor the overall activity and booking performance of the hotel booking system.

---

# 🗄️ Database

The application uses **MongoDB** with **Mongoose** for schema definition, data modeling, and database operations.

## Main Entities

```text
User
Hotel
Room
Booking
Feedback
```

## Entity Relationship

```text
User
  │
  ├──── Booking
  │        │
  │        └──── Room
  │               │
  │               └──── Hotel
  │
  └──── Feedback
```

MongoDB references connect users, bookings, rooms, hotels, and feedback.

---

# ✅ Validation

The application implements validation across the major workflows using **Express Validator** and application-level validation.

## User Validation

* Name validation
* Email validation
* Mobile number validation
* Password validation
* Confirm password validation

## Authentication Validation

* Login validation
* Email format validation
* Password validation
* Forgot password email validation
* Reset password validation

## Hotel Validation

* Required hotel fields
* Hotel information validation
* Data format validation

## Room Validation

* Room number validation
* Room type validation
* Maximum guest validation
* Bed type validation
* Bed count validation
* Room price validation
* Room size validation
* Room status validation
* Image upload validation

## Booking Validation

```text
Check-out > Check-in

Guests >= 1

Guests <= Room maximum capacity

Room price > 0

Room must be available for selected dates
```

## Feedback Validation

* Required fields
* Input validation
* Data format validation

Validation errors are handled and displayed appropriately to users.

---

# 🔒 Security

The application includes several security mechanisms:

* bcrypt password hashing
* JWT authentication
* Cookie-based authentication
* Protected routes
* Role-based authorization
* Admin authorization middleware
* Request validation
* Environment variables for sensitive configuration
* File upload middleware
* Password reset token workflow
* Application logging

## Future Security Hardening

Potential production-level improvements include:

* Rate limiting
* Helmet
* CSRF protection
* Stronger cookie configuration
* Additional input sanitization
* Advanced security monitoring

---

# 🧪 Error Handling & Logging

The application includes application-level error handling and logging.

## Winston Logging

**Winston** is used for application logging.

```text
logs/
├── combined.log
└── error.log
```

## Error Handling

The application handles errors including:

* Validation errors
* Authentication errors
* Authorization errors
* Invalid MongoDB ObjectIds
* Database errors
* Booking availability errors
* File upload errors
* Application-level errors

---

# 📚 API Documentation

The project includes a **Swagger API specification**:

```text
swagger.json
```

The Swagger specification documents the application's API endpoints, including available routes, HTTP methods, parameters, request structures, and responses.

It can be used during development to understand and test the backend API.

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB or MongoDB Atlas
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Kashish-web09/Hotel_Booking.git
```

---

## 2. Navigate to the Project

```bash
cd Hotel_Booking
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=9090

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_app_password
```

Add any additional environment variables required by your local configuration.

> ⚠️ **Never commit `.env` to GitHub.** Keep MongoDB credentials, JWT secrets, email credentials, and other sensitive configuration private.

---

## 5. Start the Application

```bash
npm start
```

The application will run at:

```text
http://localhost:9090
```

---

# 🔄 Application Workflows

## Guest Workflow

```text
Register
   ↓
Login
   ↓
Guest Dashboard
   ↓
Search Hotel / Rooms
   ↓
View Room
   ↓
Book Room
   ↓
Check Availability
   ↓
Booking Confirmation
   ↓
View / Manage Booking
   ↓
Profile / Feedback
```

## Admin Workflow

```text
Admin Login
   ↓
Admin Dashboard
   ↓
View Statistics
   ↓
Manage Hotels
   ↓
Manage Rooms
   ↓
Manage Bookings
   ↓
Manage Feedback
   ↓
Manage Users
   ↓
Admin Profile
```

---

# 📈 Future Improvements

The core application functionality is implemented.

Possible future improvements include:

* [ ] Automated testing
* [ ] Rate limiting
* [ ] Helmet security middleware
* [ ] CSRF protection
* [ ] Payment gateway integration
* [ ] Hotel ratings and reviews
* [ ] Production deployment
* [ ] Advanced analytics
* [ ] Improved responsive UI/UX
* [ ] Enhanced API documentation

---

# 🎯 Learning Outcomes

Through this project, I gained practical experience with:

* Full-stack web application development
* Node.js
* Express.js
* REST API development
* MongoDB
* Mongoose
* JWT authentication
* Cookie-based authentication
* Role-based authorization
* Middleware design
* MVC architecture
* Feature-based project organization
* Repository pattern
* EJS server-side rendering
* File uploads using Multer
* Form validation
* Error handling
* Email services using Nodemailer
* Password reset workflows
* Application logging using Winston
* Swagger API documentation
* Git and GitHub

---

# 👨‍💻 Author

## Kashish Narang

**Full Stack Developer**

`JavaScript` • `Node.js` • `Express.js` • `MongoDB` • `React`

### GitHub

[Kashish-web09 — GitHub](https://github.com/Kashish-web09?utm_source=chatgpt.com)

### Project Repository

[Hotel Booking Management System](https://github.com/Kashish-web09/Hotel_Booking?utm_source=chatgpt.com)

---

# 📄 License

This project is developed for **learning and portfolio purposes**.
