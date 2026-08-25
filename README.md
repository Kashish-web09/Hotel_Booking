# Bradmate — Hotel Booking Management System

Bradmate is a full-stack **hotel booking and management system** built with Node.js, Express.js, MongoDB, Mongoose, EJS, Bootstrap, JWT authentication, and role-based access control.

The project uses a **feature-based architecture** where the `features/user` module contains functionality for both **guest and admin users**, with access controlled through authentication and authorization middleware.

---

## 🚀 Features

### 👤 User / Guest

* User registration and login
* JWT-based authentication
* Profile management
* Hotel browsing
* Hotel details
* Room browsing
* Room details
* Room booking
* Booking history
* Booking details
* Payment records
* Travel and destination information
* Contact/feedback submission
* Password reset functionality

### 👨‍💼 Admin

Administrators can access protected functionality for:

* Admin dashboard
* Hotel management
* Room management
* Booking management
* Payment management
* User/profile management
* Destination/travel management
* Feedback/contact management

The project does **not duplicate the complete feature structure into separate `guest` and `admin` folders**. Instead, common functionality is organized under:

```text
features/user/
```

Role-specific access is controlled using middleware.

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Cookie-based authentication
* MVC architecture
* Repository pattern
* Role-based authorization
* Multer

### Frontend

* EJS
* HTML5
* CSS3
* Bootstrap
* JavaScript

### Services

* Email Service
* AI Service
* Application-level error handling
* Logging
* Swagger/OpenAPI

### Planned Integrations

* Razorpay
* AI-powered travel assistant
* AI hotel recommendations
* Notifications
* Analytics
* Automated testing
* CI/CD

---

## 📁 Project Structure

```text
bradmate/
│
├── aiService/
│   ├── aiController.js
│   ├── aiRoutes.js
│   └── aiService.js
│
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
│   ├── adminMiddleware.js
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
│   │   └── layout.ejs
│   ├── partials/
│   │   ├── adminNavbar.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── errorPages/
│   │   ├── 404Error.ejs
│   │   └── 500Error.ejs
│   └── *.ejs
│
├── app.js
├── package.json
├── package-lock.json
├── swagger.json
├── .env
└── README.md
```

---

## 🏗️ Architecture

Bradmate follows a **feature-based MVC + Repository architecture**.

The typical request flow is:

```text
Client
  ↓
Route
  ↓
Authentication / Authorization Middleware
  ↓
Controller
  ↓
Repository
  ↓
Mongoose
  ↓
MongoDB
```

### Controller

Controllers handle:

* HTTP requests
* Business-flow logic
* Response handling
* Role-specific operations

### Repository

Repositories handle database operations and keep MongoDB queries separate from controllers.

### Schema

Mongoose schemas define the structure of MongoDB documents.

### Validation

Validation modules validate incoming request data before it reaches the main business logic.

---

## 👥 Guest + Admin System

The `features/user` directory contains both **guest-facing and admin-related functionality**.

For example:

```text
features/user/
├── booking/
├── contact/
├── dashboard/
├── hotel/
├── payment/
├── rooms/
├── travel/
└── userAuth/
```

The same feature can contain operations for both roles.

For example:

```text
Hotel
├── Guest → View hotels
└── Admin → Add / edit / delete hotels
```

```text
Room
├── Guest → View rooms
└── Admin → Add / edit / delete rooms
```

```text
Booking
├── Guest → Create/view bookings
└── Admin → Manage bookings
```

Access is controlled through:

```text
JWT Authentication
        ↓
Identify User
        ↓
Identify Role
        ↓
Admin Middleware (when required)
        ↓
Controller
```

This avoids unnecessarily duplicating controllers and repositories between separate `guest` and `admin` folders.

---

## 🔐 Authentication & Authorization

Bradmate uses JWT authentication.

The authentication process is:

```text
Login
  ↓
Validate credentials
  ↓
Generate JWT
  ↓
Store token in cookie
  ↓
Authenticated request
  ↓
jwtAuthMiddleware
  ↓
Decode userId + role
  ↓
Allow / reject request
```

Admin-only routes additionally pass through:

```text
adminMiddleware
```

This ensures that a normal guest cannot access administrator operations.

---

# 🏨 Core Modules

## User Authentication

Responsible for:

* Registration
* Login
* Logout
* Password management
* User validation
* User profile information

## Hotels

Responsible for:

* Hotel listing
* Hotel details
* Hotel management
* Hotel database operations

## Rooms

Responsible for:

* Room listing
* Room details
* Room creation
* Room editing
* Room management
* Availability-related operations

## Booking

Responsible for:

* Creating bookings
* Booking details
* Booking history
* Booking management
* Booking validation

## Payment

Responsible for:

* Payment records
* Payment history
* Payment status
* Admin payment management

## Travel

Responsible for:

* Destinations
* Travel information
* Destination management
* Travel-related content

## Contact / Feedback

Responsible for:

* Contact forms
* Feedback submission
* Feedback management
* Feedback status

## Dashboard

Provides:

* User dashboard
* Admin dashboard
* Application statistics
* Booking-related information

---

# 🤖 AI Service

Bradmate already contains an AI service layer:

```text
aiService/
├── aiController.js
├── aiRoutes.js
└── aiService.js
```

The AI service is designed to become an intelligent layer of the application.

### Future AI Features

* AI travel assistant
* Hotel recommendations
* Destination recommendations
* Personalized travel suggestions
* Budget-based hotel recommendations
* Natural-language hotel search
* AI itinerary generation
* Trip planning
* Recommendation based on previous bookings

Example:

```text
User:
"I want a 3-day budget trip to Shimla."

        ↓

AI Service

        ↓

Destination + Hotel + Room
Recommendations

        ↓

Suggested Itinerary
```

---

# 💳 Razorpay Integration — Future

Razorpay will be integrated as the application's online payment gateway.

Planned flow:

```text
Select Room
    ↓
Create Booking
    ↓
Create Razorpay Order
    ↓
Razorpay Checkout
    ↓
Payment
    ↓
Server-side Signature Verification
    ↓
Update Payment Status
    ↓
Update Booking Status
    ↓
Send Confirmation Email
```

Possible payment states:

```text
Pending
Paid
Failed
Refunded
```

Future implementation will also include:

* Razorpay webhooks
* Payment verification
* Refund processing
* Failed-payment handling
* Payment reconciliation

---

# 📧 Email Service

Bradmate contains an email service layer:

```text
emailService/
├── emailConfig.js
└── emailServices.js
```

Potential email notifications include:

* Registration confirmation
* Booking confirmation
* Payment confirmation
* Booking cancellation
* Password reset
* Admin notifications

Future improvements can include reusable HTML email templates and transactional email tracking.

---

# 📊 Future Implementations

## 1. Razorpay Payment Gateway

* [ ] Razorpay order creation
* [ ] Razorpay Checkout
* [ ] Server-side payment verification
* [ ] Payment webhooks
* [ ] Refund system
* [ ] Payment reconciliation

## 2. AI Travel Assistant

* [ ] AI chatbot
* [ ] Hotel recommendations
* [ ] Destination recommendations
* [ ] AI itinerary generation
* [ ] Budget planning
* [ ] Natural-language search

## 3. Advanced Search

* [ ] Destination filtering
* [ ] Price filtering
* [ ] Room type filtering
* [ ] Hotel rating filtering
* [ ] Amenities filtering
* [ ] Availability filtering
* [ ] Price/rating sorting

## 4. Reviews & Ratings

* [ ] Hotel reviews
* [ ] Star ratings
* [ ] Verified-user reviews
* [ ] Review moderation
* [ ] Average hotel ratings

## 5. Notifications

* [ ] Booking notifications
* [ ] Payment notifications
* [ ] Cancellation notifications
* [ ] Email notifications
* [ ] Admin alerts

## 6. Admin Analytics

Planned dashboard analytics:

* [ ] Total users
* [ ] Total bookings
* [ ] Total revenue
* [ ] Occupancy rate
* [ ] Popular hotels
* [ ] Popular destinations
* [ ] Monthly revenue
* [ ] Booking trends
* [ ] User growth

## 7. Security Improvements

* [ ] Rate limiting
* [ ] Helmet
* [ ] CSRF protection
* [ ] Input sanitization
* [ ] Strong password policies
* [ ] Refresh-token strategy
* [ ] Secure production cookies
* [ ] Audit logs
* [ ] Better authorization checks

## 8. Automated Testing

Planned testing with:

* Jest
* Supertest

Testing areas:

* [ ] Authentication
* [ ] Authorization
* [ ] Booking APIs
* [ ] Hotel APIs
* [ ] Room APIs
* [ ] Payment APIs
* [ ] Validation
* [ ] Repository functions

## 9. Deployment & DevOps

* [ ] Docker
* [ ] Production environment configuration
* [ ] CI/CD
* [ ] Cloud deployment
* [ ] Health-check endpoint
* [ ] Production monitoring
* [ ] Centralized logging

---

# ⚙️ Installation

### 1. Clone the project

```bash
git clone <your-repository-url>
cd hotel_booking
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file.

Example:

```env
PORT=9090
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password

AI_API_KEY=your_ai_api_key

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Never commit `.env` to Git.

### 4. Start the application

```bash
npm start
```

---

# 📝 Logging

Application logs are stored inside:

```text
logs/
├── combined.log
└── error.log
```

Logging can be extended for production monitoring and debugging.

---

# 📚 API Documentation

Swagger/OpenAPI documentation is maintained in:

```text
swagger.json
```

As new endpoints are added, the Swagger documentation can be expanded accordingly.

---

# 🎯 Development Roadmap

### Completed

* [x] User authentication
* [x] JWT authentication
* [x] Role-based authorization
* [x] Hotel module
* [x] Room module
* [x] Booking module
* [x] Payment module
* [x] Travel module
* [x] Contact/feedback module
* [x] User profile
* [x] Email service
* [x] AI service foundation
* [x] Feature-based architecture
* [x] Repository pattern
* [x] Application logging
* [x] Swagger foundation

### Upcoming

* [ ] Razorpay integration
* [ ] AI travel assistant
* [ ] AI hotel recommendation engine
* [ ] Reviews and ratings
* [ ] Advanced search
* [ ] Notification system
* [ ] Admin analytics
* [ ] Automated testing
* [ ] Docker
* [ ] CI/CD
* [ ] Production deployment

---

# 💡 Why Bradmate?

Bradmate is designed to demonstrate how a real-world hotel booking platform can be structured using a scalable backend architecture.

The feature-based approach keeps:

```text
Routes
Controllers
Repositories
Schemas
Validation
```

organized by business functionality rather than putting everything into large global folders.

This makes the application easier to:

* Maintain
* Debug
* Test
* Scale
* Add new features
* Integrate third-party services
* Implement role-based access

---

# 🌍 Future Vision

Bradmate aims to evolve from a hotel booking application into an **AI-powered travel platform** combining:

```text
Hotel Discovery
       +
Room Booking
       +
Online Payments
       +
Travel Planning
       +
AI Recommendations
       +
Personalized Experiences
       +
Admin Management
```

The long-term goal is to provide users with a complete platform for **discovering destinations, finding hotels, planning trips, booking rooms, making payments, and receiving intelligent AI-powered travel recommendations.**

---

## 👨‍💻 Project Information

**Project:** Bradmate
**Type:** Hotel Booking & Management System
**Architecture:** Feature-based MVC + Repository Pattern
**Backend:** Node.js + Express.js
**Database:** MongoDB + Mongoose
**Frontend:** EJS + Bootstrap
**Authentication:** JWT
**Payments:** Razorpay — planned
**AI:** AI Service — foundation implemented
**API Documentation:** Swagger/OpenAPI
