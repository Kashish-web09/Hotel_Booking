# 🏨 Hotel Booking Management System

A full-stack hotel booking web application built using **Node.js, Express.js, MongoDB, Mongoose, and EJS**.

The application provides separate workflows for **Guests** and **Administrators**, including authentication, hotel and room management, room search, booking management, feedback, and an admin dashboard with business statistics.

> **Project Status:** Core functionality is implemented. Guest/Admin profile management, complete validation, security hardening, and final testing are currently in progress.

---

## 🚀 Features

### 👤 Guest Features

- User registration and login
- Logout
- Forgot password
- Reset password
- JWT-based authentication
- Cookie-based authentication
- Guest dashboard
- Hotel search
- Hotel details
- Room listing
- Room search and filtering
- Room details
- Create bookings
- View booking details
- View booking history
- Manage and cancel bookings
- Submit feedback
- About Us page
- Guest profile *(in progress)*

### 🛡️ Admin Features

- Admin login/logout
- JWT-based admin authentication
- Role-based authorization
- Admin dashboard
- Hotel management
- Room management
- Room image upload
- Booking management
- Booking status updates
- Feedback management
- Feedback status updates
- Dashboard statistics:
  - Total Users
  - Total Hotels
  - Total Rooms
  - Total Bookings
  - Total Revenue
  - Recent Bookings
  - Confirmed Bookings
- Admin profile *(in progress)*

---

## 🧰 Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, Bootstrap, EJS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, Cookies, bcrypt |
| Validation | Express Validator |
| File Upload | Multer |
| Logging | Winston |
| Configuration | dotenv |
| Version Control | Git, GitHub |

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

This structure keeps authentication, routing, business logic, and database operations separated and maintainable.

---

## 📁 Project Structure

```text
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
│   │
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
```

---

## 🔐 Authentication & Authorization

Authentication is implemented using **JWT and HTTP cookies**.

The application separates guest and admin access.

### Guest Authentication

```text
Guest
  ↓
User Login
  ↓
JWT
  ↓
Cookie
  ↓
Protected Guest Routes
```

### Admin Authentication

```text
Admin
  ↓
Admin Login
  ↓
Admin JWT
  ↓
Cookie
  ↓
Admin Authorization Middleware
  ↓
Protected Admin Routes
```

Passwords are securely hashed using **bcrypt** before being stored.

Example protected admin route:

```js
app.use('/api/admin/hotel', adminUser, hotelRoutes);
```

Example protected guest route:

```js
app.use('/api/guest/booking', currentUser, bookingRoutes);
```

---

## 🏨 Hotel & Room Management

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

Room information includes:

- Room number
- Room type
- Floor
- Maximum guests
- Bed type
- Bed count
- Price per night
- Room size
- Amenities
- Room images
- Room status
- AC availability
- Balcony availability
- Smoking policy

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
Check Availability
     ↓
Create Booking
     ↓
View Booking Details
     ↓
Manage / Cancel Booking
```

A booking contains information such as:

- User
- Room
- Check-in date
- Check-out date
- Number of guests
- Price per night
- Total amount
- Booking status

---

## 📊 Admin Dashboard

The admin dashboard provides a centralized overview of application activity.

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

This allows administrators to monitor the overall activity of the hotel booking system from a single dashboard.

---

## 💬 Feedback Management

Guests can submit feedback through the application.

Admins can:

- View guest feedback
- Review feedback details
- Update feedback status

### Feedback Flow

```text
Guest
  ↓
Submit Feedback
  ↓
MongoDB
  ↓
Admin Dashboard
  ↓
Review / Update Status
```

---

## 🗄️ Database

The application uses **MongoDB** as the database with **Mongoose** for schema and data modeling.

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
```

This allows users, bookings, rooms, and hotels to be connected through MongoDB references.

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB / MongoDB Atlas
- Git

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
```

Add any additional environment variables required by your configuration.

### 5. Start the Application

```bash
npm start
```

The application will run at:

```text
http://localhost:9090
```

---

## 🧪 Validation & Error Handling

Validation is being implemented across the application's major workflows.

Examples include:

- Required field validation
- Email validation
- Password validation
- MongoDB ObjectId validation
- Room price validation
- Guest count validation
- Booking date validation
- Room type validation
- Hotel information validation
- Feedback validation
- File upload validation

### Booking Validation

```text
Check-out > Check-in

Guests >= 1

Guests <= Room maximum capacity

Room price > 0

Room must be available for selected dates
```

---

## 🔒 Security

The application currently uses:

- bcrypt password hashing
- JWT authentication
- Cookie-based authentication
- Protected routes
- Admin authorization middleware
- Request validation
- Environment variables
- File upload middleware
- Application logging

### Planned Security Improvements

- Rate limiting
- Helmet
- CSRF protection
- Stronger cookie configuration
- Additional input sanitization
- More comprehensive authorization checks

---

## 📌 Future Improvements

- [ ] Guest profile management
- [ ] Admin profile management
- [ ] Complete validation across all modules
- [ ] Centralized error handling improvements
- [ ] Automated testing
- [ ] Security hardening
- [ ] Email booking confirmation
- [ ] Payment gateway integration
- [ ] Hotel ratings and reviews
- [ ] Production deployment

---

## 🎯 Learning Outcomes

Through this project, I gained practical experience with:

- Full-stack web application development
- Node.js and Express.js
- REST API development
- MongoDB and Mongoose
- JWT authentication and authorization
- Middleware design
- MVC architecture
- Feature-based project organization
- Repository pattern
- EJS server-side rendering
- File uploads
- Form validation
- Error handling
- Application logging
- Git and GitHub

---

## 👨‍💻 Author

**Kashish Narang**

Full Stack Developer

**JavaScript | Node.js | Express.js | MongoDB | React**

---

## 📄 License

This project is developed for **learning and portfolio purposes**.
