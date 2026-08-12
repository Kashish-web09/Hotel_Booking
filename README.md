# 🏨 Hotel Booking Management System

A full-stack hotel booking management web application built using **Node.js, Express.js, MongoDB, Mongoose, and EJS**.

The application provides separate workflows for **Guests** and **Administrators**, including authentication, authorization, hotel and room management, room search, booking management, feedback management, profile management, email services, validation, and an admin dashboard with business statistics.

> **Project Status:** Core functionality is implemented, including authentication, authorization, validations, email service, guest/admin profiles, hotel and room management, booking workflows, feedback management, and admin dashboard features.

---

## 🚀 Features

### 👤 Guest Features

* User registration and login
* Logout
* Forgot password
* Password reset through email
* JWT-based authentication
* Cookie-based authentication
* Guest dashboard
* Hotel search
* Hotel details
* Room listing
* Room search and filtering
* Room details
* Create bookings
* Booking availability validation
* View booking details
* View booking history
* Manage bookings
* Cancel bookings
* Submit feedback
* Guest profile management
* Update guest profile
* Change password
* Email-based password recovery
* About Us page

---

### 🛡️ Admin Features

* Admin login/logout
* JWT-based admin authentication
* Cookie-based authentication
* Role-based authorization
* Admin dashboard
* Admin profile management
* Update admin profile
* Change password
* Hotel management
* Room management
* Room image upload
* Booking management
* Booking status updates
* Feedback management
* Feedback status updates
* Email service
* Dashboard statistics

### 📊 Admin Dashboard Statistics

* Total Users
* Total Hotels
* Total Rooms
* Total Bookings
* Total Revenue
* Recent Bookings
* Confirmed Bookings

---

## 📧 Email Service

The application includes an email service for authentication-related workflows.

### Email Features

* Forgot password email
* Password reset link
* Secure reset-token workflow
* Email-based user communication

### Email Flow

```text
User
  ↓
Forgot Password
  ↓
Enter Registered Email
  ↓
Generate Reset Token
  ↓
Send Email
  ↓
User Opens Reset Link
  ↓
Reset Password
  ↓
Password Updated
```

The email functionality is implemented using **Nodemailer**.

---

## 🧰 Tech Stack

| Category        | Technologies                            |
| --------------- | --------------------------------------- |
| Frontend        | HTML5, CSS3, JavaScript, Bootstrap, EJS |
| Backend         | Node.js, Express.js                     |
| Database        | MongoDB, Mongoose                       |
| Authentication  | JWT, Cookies, bcrypt                    |
| Validation      | Express Validator                       |
| Email           | Nodemailer                              |
| File Upload     | Multer                                  |
| Logging         | Winston                                 |
| Configuration   | dotenv                                  |
| Version Control | Git, GitHub                             |

---

## 🏗️ Architecture

The application follows a **feature-based architecture** with separation of responsibilities between routes, middleware, controllers, repositories, and models.

### Request Flow

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

### Protected Request Flow

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

This structure keeps authentication, authorization, routing, business logic, and database operations separated and maintainable.

---

## 📁 Project Structure

```text
HOTEL_BOOKING/
│
├── config/
│   ├── mongoDb.js
│   └── mongoose.js
│
├── emailService/
│   └── ...
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
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

## 🔐 Authentication & Authorization

Authentication is implemented using **JWT and HTTP cookies**.

The application separates Guest and Admin access through dedicated authentication and authorization middleware.

### Guest Authentication

```text
Guest
  ↓
User Login
  ↓
JWT Generated
  ↓
JWT Stored in Cookie
  ↓
Authentication Middleware
  ↓
Protected Guest Routes
```

### Admin Authentication

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

Passwords are securely hashed using **bcrypt** before being stored in the database.

### Example Protected Admin Route

```js
app.use('/api/admin/hotel', adminUser, hotelRoutes);
```

### Example Protected Guest Route

```js
app.use('/api/guest/booking', currentUser, bookingRoutes);
```

---

## 👤 Profile Management

Both Guest and Admin users have dedicated profile management functionality.

### Guest Profile

Guests can:

* View profile information
* Update profile details
* Change password
* Manage account information

### Admin Profile

Administrators can:

* View admin profile
* Update profile details
* Change password
* Manage administrator account information

---

## 🏨 Hotel & Room Management

Administrators can manage hotel and room information through the admin panel.

### Admin Workflow

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

### Room Information

Each room can contain:

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

### Room Status

```text
Available
Maintenance
Cleaning
```

---

## 📅 Booking Workflow

The guest booking flow is:

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

### Booking Information

A booking contains:

* User
* Room
* Check-in date
* Check-out date
* Number of guests
* Price per night
* Total amount
* Booking status

### Booking Status

```text
Pending
Confirmed
Cancelled
Completed
```

---

## 💬 Feedback Management

Guests can submit feedback through the application.

Admins can:

* View guest feedback
* Review feedback details
* Update feedback status

### Feedback Flow

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
```

---

## 📊 Admin Dashboard

The admin dashboard provides a centralized overview of hotel booking activity.

### Dashboard Metrics

```text
Total Users
Total Hotels
Total Rooms
Total Bookings
Total Revenue
Recent Bookings
Confirmed Bookings
```

This allows administrators to monitor application activity and booking performance from a single dashboard.

---

## 🗄️ Database

The application uses **MongoDB** as the primary database with **Mongoose** for schema definition and data modeling.

### Main Entities

```text
User
Hotel
Room
Booking
Feedback
```

### Entity Relationship

```text
User
  │
  └──── Booking
           │
           └──── Room
                  │
                  └──── Hotel

User
  │
  └──── Feedback
```

MongoDB references are used to connect users, bookings, rooms, hotels, and feedback.

---

## ✅ Validation

The application implements validation across major workflows using **Express Validator** and application-level validation logic.

### User Validation

* Name validation
* Email validation
* Mobile number validation
* Password validation
* Confirm password validation

### Authentication Validation

* Login field validation
* Email format validation
* Password validation
* Forgot password email validation
* Reset password validation

### Hotel Validation

* Required hotel information
* Hotel field validation
* Data format validation

### Room Validation

* Room number validation
* Room type validation
* Maximum guest validation
* Bed type validation
* Bed count validation
* Room price validation
* Room size validation
* Room status validation
* Image upload validation

### Booking Validation

```text
Check-out > Check-in

Guests >= 1

Guests <= Room maximum capacity

Room price > 0

Room must be available for selected dates
```

### Feedback Validation

* Required fields
* Input validation
* Data format validation

Validation errors are handled and displayed appropriately to users.

---

## 🔒 Security

The application implements multiple security mechanisms, including:

* bcrypt password hashing
* JWT authentication
* Cookie-based authentication
* Protected routes
* Role-based authorization
* Admin authorization middleware
* Request validation
* Environment variables for secrets
* File upload middleware
* Application logging
* Password reset token workflow

### Planned Security Improvements

The following can be added as further production-level hardening:

* Rate limiting
* Helmet
* CSRF protection
* Stronger cookie configuration
* Additional input sanitization
* Advanced security monitoring

---

## 🧪 Error Handling & Logging

The application includes centralized application-level error handling and logging.

### Logging

**Winston** is used for application logging.

Logs include:

```text
logs/
├── combined.log
└── error.log
```

### Error Handling

The application handles:

* Validation errors
* Authentication errors
* Authorization errors
* Invalid ObjectIds
* Database errors
* Booking availability errors
* File upload errors
* Application-level errors

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB / MongoDB Atlas
* Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project

```bash
cd hotel_booking
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=9090
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_app_password
```

> Never commit your `.env` file or expose your email credentials, JWT secret, or MongoDB credentials publicly.

### 5. Start the Application

```bash
npm start
```

The application will run at:

```text
http://localhost:9090
```

---

## 🔑 Application Workflows

### Guest Workflow

```text
Register
   ↓
Login
   ↓
Guest Dashboard
   ↓
Search Hotel / Rooms
   ↓
Book Room
   ↓
View Booking
   ↓
Manage Booking
   ↓
Profile / Feedback
```

### Admin Workflow

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
Admin Profile
```

---

## 📌 Future Improvements

The core application functionality is complete. Future improvements may include:

* [ ] Automated testing
* [ ] Rate limiting
* [ ] Helmet security middleware
* [ ] CSRF protection
* [ ] Payment gateway integration
* [ ] Hotel ratings and reviews
* [ ] Production deployment
* [ ] Advanced analytics
* [ ] Booking confirmation emails
* [ ] Improved responsive UI/UX

---

## 🎯 Learning Outcomes

Through this project, I gained practical experience with:

* Full-stack web application development
* Node.js and Express.js
* REST API development
* MongoDB and Mongoose
* JWT authentication and authorization
* Cookie-based authentication
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
* Role-based access control
* Git and GitHub

---

## 👨‍💻 Author

**Kashish Narang**

Full Stack Developer

**JavaScript | Node.js | Express.js | MongoDB | React**

---

## 📄 License

This project is developed for **learning and portfolio purposes**.
