# 🏨 Bradmate — Hotel Booking & Management System

**Bradmate** is a full-stack hotel booking and management platform built with **Node.js, Express.js, MongoDB, Mongoose, EJS, Bootstrap, and JWT authentication**.

The application provides separate experiences for **guests and administrators**, with role-based access control protecting administrative operations. It follows a **feature-based MVC architecture with the Repository Pattern** to keep business logic, database operations, validation, and routing organized and maintainable.

---

## 🌐 Overview

Bradmate allows users to discover hotels, explore rooms, make bookings, manage their profiles, view booking information, and access travel-related content.

Administrators can manage the platform through protected administrative functionality, including hotels, rooms, bookings, users, payments, destinations, and feedback.

The project also includes an **email service powered by Brevo SMTP**, application logging, Swagger/OpenAPI documentation, file uploads, and an AI service foundation.

---

## ✨ Key Features

### 👤 Guest Features

* User registration and login
* JWT-based authentication
* Cookie-based session handling
* Role-based access control
* User profile management
* Password reset functionality
* Browse hotels
* View hotel details
* Browse available rooms
* View room details
* Create room bookings
* View booking history
* View booking details
* View payment records
* Travel and destination information
* Contact and feedback submission

### 👨‍💼 Admin Features

Protected administrative functionality includes:

* Admin dashboard
* Hotel management
* Room management
* Booking management
* Payment management
* User management
* Profile management
* Destination/travel management
* Contact and feedback management
* Hotel image uploads
* Application statistics

---

# 🛠️ Technology Stack

## Backend

| Technology    | Purpose                        |
| ------------- | ------------------------------ |
| Node.js       | Runtime environment            |
| Express.js    | Web framework                  |
| MongoDB       | Database                       |
| Mongoose      | MongoDB ODM                    |
| JWT           | Authentication                 |
| Cookie Parser | Authentication cookie handling |
| Multer        | File/image uploads             |
| Winston       | Application logging            |

## Frontend

| Technology | Purpose                   |
| ---------- | ------------------------- |
| EJS        | Server-side rendering     |
| HTML5      | Page structure            |
| CSS3       | Styling                   |
| Bootstrap  | Responsive UI             |
| JavaScript | Client-side functionality |

## Services & Tools

| Service / Tool            | Purpose                |
| ------------------------- | ---------------------- |
| Brevo SMTP                | Transactional email    |
| Swagger/OpenAPI           | API documentation      |
| Gemini AI                 | AI service foundation  |
| Git & GitHub              | Version control        |
| MongoDB Atlas             | Cloud database         |
| Render / Cloud Deployment | Application deployment |

---

# 🏗️ Architecture

Bradmate follows a **feature-based MVC + Repository architecture**.

The application is organized around business features rather than placing all controllers, routes, schemas, and repositories into separate global folders.

### Request Flow

```text
Client
  │
  ▼
Route
  │
  ▼
Authentication / Authorization
  │
  ▼
Validation
  │
  ▼
Controller
  │
  ▼
Repository
  │
  ▼
Mongoose
  │
  ▼
MongoDB
```

This architecture separates responsibilities and makes the application easier to maintain, debug, test, and extend.

---

# 📁 Project Structure

```text
hotel_booking/
│
|
├── config/
│   ├── mongoDb.js
│   └── mongoose.js
│
├── emailService/
│   ├── emailConfig.js
│   └── emailServices.js
│
├── errorFile/
│   └── applicationLevelError.js
│
├── features/
│   └── user/
│       │
│       ├── booking/
│       │   ├── bookingController.js
│       │   ├── bookingRepository.js
│       │   ├── bookingRoutes.js
│       │   ├── bookingSchema.js
│       │   └── bookingValidation.js
│       │
│       ├── contact/
│       │   ├── contactController.js
│       │   ├── contactRepository.js
│       │   ├── contactRoutes.js
│       │   ├── contactSchema.js
│       │   └── contactValidation.js
│       │
│       ├── dashboard/
│       │   ├── dashController.js
│       │   └── dashRoutes.js
│       │
│       ├── hotel/
│       │   ├── hotelController.js
│       │   ├── hotelRepository.js
│       │   ├── hotelRoutes.js
│       │   ├── hotelSchema.js
│       │   └── hotelValidation.js
│       │
│       ├── payment/
│       │   ├── paymentController.js
│       │   ├── paymentRepository.js
│       │   └── paymentRoutes.js
│       │
│       ├── rooms/
│       │   ├── roomsController.js
│       │   ├── roomsRepository.js
│       │   ├── roomsRoutes.js
│       │   ├── roomsSchema.js
│       │   └── roomsValidation.js
│       │
│       ├── travel/
│       │   ├── travelController.js
│       │   ├── travelRepository.js
│       │   ├── travelRoutes.js
│       │   ├── travelSchema.js
│       │   └── travelValidation.js
│       │
│       └── userAuth/
│           ├── userController.js
│           ├── userRepository.js
│           ├── userRoutes.js
│           ├── userSchema.js
│           └── userValidation.js
│
├── middleware/
│   ├── commonValidation.js
│   ├── fileUploadMiddleware.js
│   ├── jwtAuthMiddleware.js
│   └── loggerMiddleware.js
│
├── public/
│   ├── css/
│   └── images/
│
├── uploads/
│
├── views/
│   ├── layout/
│   ├── partials/
│   ├── errorPages/
│   └── *.ejs
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── swagger.json
├── .env
└── README.md
```

> `.env`, logs, and environment-specific files should not be committed to the repository.

---

# 🔐 Authentication & Authorization

Bradmate uses **JWT-based authentication** with cookies.

### Authentication Flow

```text
User Login
    │
    ▼
Validate Credentials
    │
    ▼
Generate JWT
    │
    ▼
Store Token in Cookie
    │
    ▼
Authenticated Request
    │
    ▼
JWT Authentication Middleware
    │
    ▼
Identify User + Role
    │
    ▼
Authorize Request
```

Administrative routes are protected using role-based authorization.

For example:

```text
Guest
  │
  ├── Browse Hotels
  ├── Browse Rooms
  └── Create Booking

Admin
  │
  ├── Add Hotel
  ├── Edit Hotel
  ├── Delete Hotel
  ├── Manage Rooms
  ├── Manage Bookings
  └── Manage Users
```

This prevents unauthorized users from accessing administrative functionality.

---

# 🏨 Hotel Management

The hotel module provides functionality for managing hotel information.

### Guest

* View hotels
* View hotel details
* Explore hotel locations
* Explore available rooms

### Admin

* Add hotels
* Edit hotel information
* Manage hotel status
* Upload hotel images
* Manage hotel information

Hotel information includes:

```text
Hotel Name
Description
Address
City
State
Country
Pincode
Phone
Email
Check-in Time
Check-out Time
Status
Hotel Image
```

---

# 🛏️ Room Management

The room module manages hotel rooms and their associated information.

### Guest

* Browse rooms
* View room details
* Check room information
* Book available rooms

### Admin

* Add rooms
* Edit rooms
* Manage room information
* Manage room status
* Associate rooms with hotels

---

# 📅 Booking System

The booking module handles the reservation lifecycle.

### Booking Flow

```text
Select Hotel
    ↓
Select Room
    ↓
Enter Booking Details
    ↓
Validate Request
    ↓
Create Booking
    ↓
Store Booking
    ↓
View Booking Details
```

Users can:

* Create bookings
* View booking details
* View booking history
* Manage their bookings

Administrators can manage bookings from the administrative interface.

---

# 💳 Payment Module

Bradmate includes a payment module for maintaining payment-related records and status information.

Current functionality includes:

* Payment records
* Payment status
* Payment history
* Admin payment management

### Payment Gateway

Online payment gateway integration such as **Razorpay is planned for a future release**.

Planned flow:

```text
Create Booking
      ↓
Create Payment Order
      ↓
Payment Gateway
      ↓
Payment
      ↓
Server-side Verification
      ↓
Update Payment
      ↓
Update Booking
      ↓
Send Confirmation Email
```

---

# 📧 Email Service

Bradmate uses **Brevo SMTP** for transactional email delivery.

The email service is separated into its own module:

```text
emailService/
├── emailConfig.js
└── emailServices.js
```

### Email Use Cases

The service can be used for:

* Registration emails
* Password reset emails
* Booking confirmation
* Booking cancellation
* Payment-related notifications
* Admin notifications

### Brevo SMTP

Production email delivery is configured using Brevo SMTP credentials stored securely through environment variables.

Example:

```env
BREVO_EMAIL=your_verified_email
BREVO_SMTP_KEY=your_brevo_smtp_key
```

> Never commit SMTP credentials, API keys, passwords, or `.env` files to GitHub.

---

# 🤖 AI Service

Bradmate contains an AI service layer:

```text
aiService/
├── aiController.js
├── aiRoutes.js
└── aiService.js
```

The AI layer is designed to support intelligent travel-related functionality.

### Planned AI Capabilities

* AI travel assistant
* Hotel recommendations
* Destination recommendations
* Personalized travel suggestions
* Budget-based recommendations
* Natural-language hotel search
* AI itinerary generation
* Trip planning

Example:

```text
User
 │
 │ "Plan a 3-day trip to Shimla under ₹15,000"
 ▼
AI Service
 │
 ▼
Destination + Hotel + Room Recommendations
 │
 ▼
Suggested Travel Plan
```

---

# 🗺️ Travel & Destination Module

The travel module provides destination-related information.

Functionality includes:

* Destination information
* Travel content
* Destination management
* Travel recommendations foundation

This module is designed to work alongside the AI service in future versions.

---

# 📩 Contact & Feedback

The contact module handles communication between users and the platform.

Features include:

* Contact form
* Feedback submission
* Feedback management
* Feedback status
* Admin access to submitted feedback

---

# 📊 Dashboard

Bradmate provides dashboard functionality for different user roles.

### Guest Dashboard

Provides users with information such as:

* Profile information
* Booking information
* Booking history
* Account-related information

### Admin Dashboard

Provides administrators with application-level information such as:

* Total users
* Total hotels
* Total rooms
* Total bookings
* Payment information
* Application statistics

---

# 📚 API Documentation

Bradmate uses **Swagger/OpenAPI** for API documentation.

The API specification is maintained in:

```text
swagger.json
```

Swagger can be accessed through:

```text
/api-docs
```

The documentation provides a structured view of available API endpoints and their request/response specifications.

---

# 📝 Logging & Error Handling

The application includes centralized application-level logging and error handling.

### Logging

Logging is handled through the application's logger middleware.

Typical log information includes:

```text
Authentication events
Application errors
Database errors
Request-related events
Business operations
```

Logs are maintained separately from application code.

### Error Handling

The application includes dedicated error handling for:

* Validation errors
* Authentication errors
* Authorization errors
* Database errors
* Invalid routes
* Application-level exceptions

---

# 📷 File Uploads

Hotel images are uploaded using **Multer**.

The upload flow is:

```text
Admin
  ↓
Select Hotel Image
  ↓
Multipart Form
  ↓
Multer
  ↓
Upload Processing
  ↓
Hotel Record
```

The application exposes the upload directory through the `/uploads` route during development.

For production, persistent cloud-based image storage can be introduced to avoid relying on ephemeral server storage.

---

# 🧩 Design Patterns

Bradmate demonstrates several common backend development patterns.

### MVC

```text
Model
  ↓
Controller
  ↓
View
```

### Repository Pattern

Database operations are separated from controllers.

```text
Controller
    ↓
Repository
    ↓
Mongoose
    ↓
MongoDB
```

### Feature-Based Architecture

Business functionality is grouped together:

```text
booking/
hotel/
rooms/
payment/
travel/
contact/
userAuth/
```

This approach makes the application easier to scale as new modules are added.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd hotel_booking
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=9090

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

BREVO_EMAIL=your_verified_brevo_email
BREVO_SMTP_KEY=your_brevo_smtp_key

GEMINI_API_KEY=your_gemini_api_key
```

> Use the exact environment-variable names expected by your application configuration.

**Never commit `.env` to GitHub.**

## 4. Start the Application

```bash
npm start
```

The application will start on the configured port.

Example:

```text
http://localhost:9090
```

---

# 🔒 Environment & Security

Sensitive configuration is managed using environment variables.

The following should never be committed:

```text
.env
API keys
SMTP credentials
JWT secrets
Database credentials
Payment gateway secrets
```

A `.gitignore` should include entries such as:

```gitignore
.env
logs/
uploads/
node_modules/
```

---

# 🚀 Deployment

The application is designed to support cloud deployment with environment-based configuration.

Production deployment requires configuring:

* MongoDB connection
* JWT secret
* Brevo SMTP credentials
* AI API credentials
* Application port
* Production environment variables

For uploaded images, a persistent cloud storage solution is recommended for production deployments.

---

# 🗺️ Development Roadmap

## Completed

* [x] User registration
* [x] User login
* [x] JWT authentication
* [x] Cookie-based authentication
* [x] Role-based authorization
* [x] User profile
* [x] Password reset functionality
* [x] Hotel module
* [x] Hotel image upload
* [x] Room module
* [x] Booking module
* [x] Payment record module
* [x] Travel/destination module
* [x] Contact/feedback module
* [x] Guest dashboard
* [x] Admin dashboard
* [x] Feature-based architecture
* [x] MVC architecture
* [x] Repository pattern
* [x] Application logging
* [x] Error handling
* [x] Swagger/OpenAPI foundation
* [x] Brevo SMTP email service
* [x] AI service foundation

## Planned

* [ ] Razorpay payment gateway
* [ ] Server-side payment verification
* [ ] Payment webhooks
* [ ] Refund management
* [ ] AI travel assistant
* [ ] AI hotel recommendations
* [ ] AI itinerary generation
* [ ] Advanced hotel search
* [ ] Hotel filters
* [ ] Room availability filtering
* [ ] Hotel reviews and ratings
* [ ] Notification system
* [ ] Admin analytics
* [ ] Automated testing
* [ ] Dockerization
* [ ] CI/CD pipeline
* [ ] Production image storage
* [ ] Advanced monitoring

---

# 📈 Future Vision

Bradmate is designed to evolve from a hotel booking system into a broader **AI-powered travel platform**.

```text
              BRADMATE
                  │
        ┌─────────┴─────────┐
        │                   │
   Hotel Discovery      Travel Planning
        │                   │
   Room Booking        AI Assistance
        │                   │
     Payments          Recommendations
        │                   │
        └─────────┬─────────┘
                  │
          Personalized
          Travel Experience
```

The long-term vision is to allow users to:

**Discover → Compare → Plan → Book → Pay → Travel**

through a single platform supported by intelligent recommendations and personalized travel assistance.

---

# 🎯 Project Highlights

Bradmate demonstrates practical implementation of:

* RESTful backend development
* Node.js and Express.js
* MongoDB database design
* Mongoose
* JWT authentication
* Role-based authorization
* MVC architecture
* Repository Pattern
* Server-side rendering with EJS
* Form validation
* File uploads with Multer
* Transactional email with Brevo SMTP
* Centralized logging
* Error handling
* Swagger/OpenAPI
* AI service integration
* Feature-based project organization
* Cloud database connectivity
* Production-oriented environment configuration

---

# 👨‍💻 Project Information

| Category              | Details                                |
| --------------------- | -------------------------------------- |
| **Project**           | Bradmate                               |
| **Type**              | Hotel Booking & Management System      |
| **Architecture**      | Feature-based MVC + Repository Pattern |
| **Backend**           | Node.js + Express.js                   |
| **Database**          | MongoDB + Mongoose                     |
| **Frontend**          | EJS + Bootstrap + JavaScript           |
| **Authentication**    | JWT + Cookies                          |
| **Authorization**     | Role-based access control              |
| **Email**             | Brevo SMTP                             |
| **File Upload**       | Multer                                 |
| **AI**                | Gemini-based AI service foundation     |
| **API Documentation** | Swagger/OpenAPI                        |
| **Logging**           | Winston                                |
| **Payment Gateway**   | Planned                                |
| **Deployment**        | Cloud-ready                            |

---

## ⭐ Project Goal

Bradmate was developed as a practical full-stack application to demonstrate how a scalable hotel booking platform can be designed using modern backend architecture, authentication, database abstraction, validation, email services, file handling, and role-based access control.

The project focuses not only on building features, but also on maintaining a **clean, modular, and extensible application architecture** suitable for future production development.
