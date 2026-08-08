
264ee1d4-133f-4e46-ba97-997e741916de.png
6aabf55f-35b5-483f-8ec4-2a65212fb9bc.png
75f401a2-24e4-447d-bc41-e3494769d54e.png
i'm makng a hotel bookina full stack application what i have done so far

i make user and admin auth feature (register,login,reset,forgot pass) then for admin(can listed the hotel and add the rooms get the booking and feedback update the status and in dahsboard  admin can get the total no. of users,total b rooms,bookings, and revenue and total hotels and recent booking 

for guest(can search hotel and get room list then search for rooms create booking mange booking and check all bookings ,share feedback also have a aboutUs page

and this is my folder structre and app.js

// npm packages
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import ejs from 'ejs';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { connectToMongoose } from './cofnig/mongoose.js';
import expressEjsLayouts from 'express-ejs-layouts';
// features routes
import { currentUser } from './middleware/jwtAuthMiddleware.js';
import feedbackRoutes from './features/guest/contact/contactRoutes.js';
import userAuth from './features/guest/userAuth/userRoutes.js';
import adminUserRoutes from './features/admin/adminAuth/adminRoutes.js';
import { adminUser } from './middleware/adminJwtAuthMiddleware.js';
import feedbackRoute from './features/admin/contact/contactRoutes.js';
import roomRoutes from './features/admin/rooms/roomsRoutes.js';
import roomRoute from './features/guest/rooms/roomsRoutes.js';
import bookingRoutes from './features/guest/booking/bookingRoutes.js';
import dashRoutes from './features/guest/dashboard/dashRoutes.js';
import bookingRoute from './features/admin/booking/bookingRoutes.js';
import adminDashRoutes from './features/admin/adminDashboard/adminDashboardRoutes.js';
import hotelRoutes from './features/admin/hotel/hotelRoutes.js';
import hotelRoute from './features/guest/hotel/hotelRoutes.js';
const app=express();
let corsOption={
origin:http://127.0.0.1:5500
}
//middlewares
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended\:true}));
app.use(cookieParser())
app.use((req,res,next)=>{

res.locals.isLogin = false;

next();


});
// View Engine
app.use(expressEjsLayouts)

app.set("view engine",'ejs');
app.set("views",'./views')
app.use((req, res, next) => {

if (req.originalUrl.startsWith("/api/admin")) {
    res.locals.layout = "layout/adminLayout";
} else {
    res.locals.layout = "layout/layout";
}

next();


});
app.use(express.static('./public'));
app.use('/uploads',express.static("uploads"))
// make user availabe to every view
app.use((req,res,next)=>{
res.locals.user=req.user||null;
next()
})

// guest routes
app.use('/api/auth',userAuth);
app.use('/',dashRoutes)
app.use('/api/guest/feedback',currentUser,feedbackRoutes)
app.use('/api/guest/hotel',currentUser,hotelRoute)
app.use('/api/guest/rooms',currentUser,roomRoute)
app.use('/api/guest/booking',currentUser,bookingRoutes)
// admin routes
app.use('/api/admin',adminUserRoutes)
app.use('/api/admin/dashboard',adminUser,adminDashRoutes)
app.use('/api/admin/feedback',adminUser,feedbackRoute)
app.use('/api/admin/hotel',adminUser,hotelRoutes)
app.use('/api/admin/rooms',adminUser,roomRoutes)
app.use('/api/admin/booking',adminUser,bookingRoute)
const startServer = async () => {
await connectToMongoose();

app.listen(9090, () => {
    console.log("Server running at http://localhost:9090");
});


};

startServer();

package.json

{

  "name": "hotel\_booking",

  "version": "1.0.0",

  "description": "hotel booking app clone",

  "license": "ISC",

  "author": "kashish narang",

  "type": "module",

  "main": "app.js",

  "scripts": {

    "test": "echo \\"Error: no test specified\\" && exit 1",

    "start": "node app.js"

  },

  "dependencies": {

    "bcrypt": "^6.0.0",

    "cookie-parser": "^1.4.7",

    "cors": "^2.8.6",

    "crypto": "^1.0.1",

    "dotenv": "^17.4.2",

    "ejs": "^6.0.1",

    "express": "^5.2.1",

    "express-ejs-layouts": "^2.5.1",

    "express-validator": "^7.3.2",

    "jsonwebtoken": "^9.0.3",

    "mongodb": "^7.5.0",

    "mongoose": "^9.8.0",

    "multer": "^2.2.0",

    "validator": "^13.15.35",

    "winston": "^3.19.0"

  }

}



now i'll make profile page for both and then make validions for pending features

Yes — at this point your Hotel Booking application is already a substantial full-stack project, not just a CRUD project. Looking at your folder structure, routes, features, and app.js, you have a good MVC-style separation.

Your next plan — Profile → validations → final testing/polish — is exactly the right direction.

What you have completed
🔐 1. Authentication & Authorization
Guest/User
Register

Login

Logout

Forgot password

Reset password

JWT authentication

Cookie-based authentication

Protected guest routes

Admin
Admin login

Admin logout

Admin JWT authentication

Protected admin routes

Separate admin layout

This is already a strong part of the project.

🏨 2. Admin Hotel Management
Admin can:

Add hotels

View/list hotels

Manage hotel information

Your structure:

features/
└── admin/
    └── hotel/
        ├── hotelController.js
        ├── hotelModel.js
        ├── hotelRepository.js
        └── hotelRoutes.js
That's a good feature-based architecture.

🛏️ 3. Admin Room Management
Admin can:

Add rooms

List rooms

Edit rooms

Manage room details

Upload room images

Set room type

Set price

Set capacity

Set room status

Manage availability-related information

You also have:

admin/
└── rooms/
and corresponding guest room functionality.

📅 4. Guest Booking System
Guest can:

Search hotels

View hotel details

View rooms

Search/filter rooms

Select room

Create booking

View booking details

View all bookings

Cancel/manage booking

This is one of the most important parts of the application, and you've already implemented the core flow.

📊 5. Admin Dashboard
You have:

Total users

Total rooms

Total bookings

Total revenue

Total hotels

Recent bookings

Booking information

This makes the project look much more like an actual application rather than a simple learning project.

💬 6. Feedback
Guest:

Guest → Submit feedback
Admin:

Admin → View feedback → Update status
Good separation here as well.

👤 7. Guest Side
You've got:

guest/
├── aboutUs.ejs
├── booking.ejs
├── bookingDetails.ejs
├── contact.ejs
├── dashboard.ejs
├── hotel.ejs
├── hotelDetails.ejs
├── login.ejs
├── myBooking.ejs
├── register.ejs
├── resetPass.ejs
├── room.ejs
└── roomDetails.ejs
That's a fairly complete guest experience.

Your next steps
I'd do them in this exact order:

1. Guest Profile
       ↓
2. Admin Profile
       ↓
3. Input Validation
       ↓
4. Backend Error Handling
       ↓
5. Authorization / Security Check
       ↓
6. UI/UX Polish
       ↓
7. Full Application Testing
       ↓
8. README + Screenshots
       ↓
9. GitHub Final Push
1. Build Guest Profile first
I'd make:

features/
└── guest/
    └── profile/
        ├── profileController.js
        ├── profileRepository.js
        └── profileRoutes.js
And:

views/
└── guest/
    └── profile.ejs
Profile should show something like:

-----------------------------------
           My Profile
-----------------------------------

Name       Kashish Narang
Email      kashish@example.com
Phone      98XXXXXXXX

[ Edit Profile ]

-----------------------------------
Account
-----------------------------------

[ My Bookings ]
[ Change Password ]
[ Logout ]
I'd keep the first version simple.

Guest profile functionality
GET

GET /api/guest/profile
UPDATE

PUT /api/guest/profile
Potential fields:

name
phone
I wouldn't allow the guest to directly edit:

email
role
password
Password should have its own change-password flow.

2. Admin Profile
Then:

features/
└── admin/
    └── adminAuth/
You can either extend your existing adminAuth feature or create:

admin/
└── profile/
Admin profile could show:

-----------------------------------
           Admin Profile
-----------------------------------

Name       Admin Name
Email      admin@example.com
Role       Administrator

[ Edit Profile ]
[ Change Password ]
[ Logout ]
3. Then do validations
This is probably the most important remaining technical task.

Since you already have:

"express-validator": "^7.3.2"
use it properly.

I'd create:

middleware/
    adminJwtAuthMiddleware.js
    commonValidation.js
    fileUploadMiddleware.js
    jwtAuthMiddleware.js
Or, even better, keep validations close to their features:

features/
├── guest/
│   ├── userAuth/
│   │   └── userValidation.js
│   ├── booking/
│   │   └── bookingValidation.js
│   ├── hotel/
│   │   └── hotelValidation.js
│   ├── rooms/
│   │   └── roomValidation.js
│   └── contact/
│       └── feedbackValidation.js
For example:

Registration
name
→ required
→ minimum length

email
→ required
→ valid email
→ normalized

password
→ required
→ minimum length

phone
→ valid format
Hotel
hotelName
→ required

location
→ required

description
→ required

amenities
→ valid array
Room
roomNumber
→ required

roomType
→ enum validation

maxGuests
→ integer
→ minimum 1

pricePerNight
→ numeric
→ greater than 0
Booking
roomId
→ valid MongoDB ObjectId

checkIn
→ valid date

checkOut
→ valid date

guests
→ integer
→ minimum 1
And importantly:

checkOut > checkIn
One thing I would fix before continuing
There is a small issue in your app.js that I noticed.

You currently have:

// make user availabe to every view
app.use((req,res,next)=>{
    res.locals.user=req.user||null;
    next()
})
But this middleware comes before your currentUser middleware is executed on guest routes:

app.use('/api/guest/hotel',currentUser,hotelRoute)
app.use('/api/guest/rooms',currentUser,roomRoute)
app.use('/api/guest/booking',currentUser,bookingRoutes)
So at this point:

req.user
may still be undefined.

That can explain some of the UI behavior you've been debugging recently.

Better approach
Put your JWT user extraction middleware globally before assigning res.locals.user.

Something along the lines of:

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
But the important part is that whatever middleware populates req.user must execute first.

Also, if your currentUser middleware is meant to be optional authentication rather than "reject unauthenticated users", you can have a separate middleware such as:

app.use(currentUser);
and then use an additional protection middleware on routes that actually require login.

That gives you:

currentUser
    ↓
identify logged-in user if cookie exists
    ↓
res.locals.user
    ↓
EJS navbar can know user state
while protected routes can still enforce authentication.

Your architecture currently looks like this
                     HOTEL BOOKING APP
                            │
             ┌──────────────┴──────────────┐
             │                             │
          GUEST                          ADMIN
             │                             │
      ┌──────┴──────┐              ┌───────┴────────┐
      │             │              │                │
    Auth         Dashboard       Auth           Dashboard
      │             │              │                │
      │          Hotels            │           Statistics
      │          Rooms             │           Revenue
      │          Booking           │           Users
      │          Feedback          │           Hotels
      │                            │           Rooms
      │                            │           Bookings
      │                            │           Feedback
      │
      └──────────────┬─────────────┘
                     │
                 MongoDB
And your code is already following:

Routes
   ↓
Controller
   ↓
Repository
   ↓
Model
   ↓
MongoDB
That's exactly the architecture I'd want to see in a portfolio/interview project.

What I'd consider "done"
Don't keep adding endless features.

After Profile + Validations, I'd focus on:

Must finish
 Guest authentication

 Admin authentication

 Hotel management

 Room management

 Hotel search

 Room search

 Booking

 Booking management

 Feedback

 Admin dashboard

 Guest profile

 Admin profile

 Complete validation

 Error handling cleanup

 Authorization/security testing

 Final UI cleanup

Nice-to-have, but not necessary
Don't get distracted with things like:

Payment Gateway
Google Login
Maps API
Reviews + ratings
Coupons
Notifications
Real-time booking
Those can make the project bigger, but they aren't necessary to prove that you understand full-stack development.

And then your final project story becomes very strong
In an interview, you can say:

"I built a full-stack hotel booking application using Node.js, Express.js, MongoDB and EJS. I implemented separate guest and admin authentication using JWT and cookies. Guests can search hotels and rooms, make and manage bookings, and submit feedback. Admins can manage hotels and rooms, monitor bookings and feedback, and view dashboard analytics such as total users, rooms, bookings, hotels and revenue. I followed a feature-based MVC architecture with separate routes, controllers, repositories and models, and added validation and middleware for authentication, authorization and file uploads."

That's a very solid project explanation for your current level.

And yes — make Profile → Validations next. After that, I'd stop adding major features and move into testing every route + fixing edge cases + polishing the UI + README/GitHub.


is this sturcutee and things are like real world projects?

Yes. Your project structure is realistic and follows patterns used in real-world backend applications, especially for a Node.js/Express application.

But I would make an important distinction:

Your architecture is real-world-like, but the project is not yet production-grade.

That's completely normal for a portfolio project.

What you're doing correctly
Your structure:

features/
├── admin/
│   ├── adminAuth/
│   ├── adminDashboard/
│   ├── booking/
│   ├── contact/
│   ├── hotel/
│   └── rooms/
│
└── guest/
    ├── booking/
    ├── contact/
    ├── dashboard/
    ├── hotel/
    ├── rooms/
    └── userAuth/
is actually better than putting everything into:

controllers/
models/
routes/
views/
because you're grouping code according to business features.

For example:

features/guest/booking/
    bookingController.js
    bookingRepository.js
    bookingRoutes.js
    bookingModel.js
This is very reasonable.

Your architecture
You're basically doing:

                    Request
                       ↓
                     Route
                       ↓
                  Middleware
                       ↓
                   Controller
                       ↓
                  Repository
                       ↓
                    Model
                       ↓
                   MongoDB
That's a legitimate backend architecture.

For example:

POST /api/guest/booking/create
             ↓
       currentUser
             ↓
       bookingRoute
             ↓
      bookingController
             ↓
       bookingRepository
             ↓
       Booking Model
             ↓
          MongoDB
That's not fake/project-tutorial architecture. This is a reasonable separation of responsibilities.

Things you're doing that resemble real applications
1. Authentication separated from business logic
You have:

guest/userAuth
admin/adminAuth
and middleware:

jwtAuthMiddleware.js
adminJwtAuthMiddleware.js
Good.

You aren't doing this:

if (req.cookies.token) {
   // 500 lines of auth logic
}
inside every controller.

2. Admin and guest authorization
You have:

app.use('/api/admin/hotel', adminUser, hotelRoutes)
and:

app.use('/api/guest/booking', currentUser, bookingRoutes)
This is a very important real-world concept:

Authentication
      +
Authorization
A user shouldn't be able to access admin functionality simply because they are logged in.

3. Repository layer
You have been using:

Controller
   ↓
Repository
   ↓
Model
For example:

// Controller
const rooms = await roomRepository.getAll();
rather than having every MongoDB query directly inside the controller.

That's a good separation.

One caveat: repositories aren't mandatory in Express applications. Some companies use:

Controller → Service → Repository → Model
while others use:

Controller → Service → Model
or even:

Controller → Model
So your approach is valid, but don't think there is only one "correct" industry structure.

4. Feature-based organization
This is probably one of the things I like most about your project.

Instead of:

controllers/
    userController.js
    hotelController.js
    roomController.js
    bookingController.js

routes/
    userRoutes.js
    hotelRoutes.js
    roomRoutes.js
    bookingRoutes.js
you have:

features/
    guest/
        booking/
            bookingController.js
            bookingRepository.js
            bookingRoutes.js

        hotel/
            hotelController.js
            hotelRepository.js
            hotelRoutes.js
That's called feature-based / modular organization.

As the application gets bigger, this can be easier to maintain.

5. Your middleware separation is good
You have:

middleware/
├── adminJwtAuthMiddleware.js
├── commonValidation.js
├── fileUploadMiddleware.js
├── jwtAuthMiddleware.js
└── loggerMiddleware.js
That's exactly the kind of cross-cutting functionality that belongs in middleware.

You've also separated:

authentication
validation
file upload
logging
instead of mixing everything into controllers.

6. Your admin dashboard is realistic
This:

Total Users
Total Hotels
Total Rooms
Total Bookings
Revenue
Recent Bookings
is realistic business functionality.

It's not just:

CRUD Hotel
CRUD Room
You're actually modeling a business workflow:

Guest
  ↓
Search Hotel
  ↓
Find Room
  ↓
Book Room
  ↓
Booking stored
  ↓
Admin sees booking
  ↓
Admin manages booking
  ↓
Revenue calculated
That's much closer to a real application.

Where you're NOT production-grade yet
This is the part I don't want you to overlook.

1. Validation
You're already planning to add this.

You need things like:

Invalid email
Invalid password
Invalid ObjectId
Negative room price
checkOut before checkIn
guests > maxGuests
Empty hotel name
Invalid room type
Invalid dates
Duplicate room number
This is essential.

2. Error handling
You have:

errorFile/
    applicationLevelError.js
Good direction.

But eventually you want a consistent API error structure, something like:

{
    "success": false,
    "message": "Room is not available",
    "statusCode": 409
}
rather than every controller returning errors differently.

3. Security
Before calling it production-ready, you'd want to consider:

JWT security
cookie flags
CSRF
rate limiting
helmet
input sanitization
MongoDB injection protection
file upload restrictions
password security
authorization checks
You don't necessarily need to implement every advanced security feature for your portfolio project, but you should understand them.

4. Booking concurrency
This is a real-world issue worth understanding.

Imagine:

Room 101
Available
Two guests simultaneously click:

BOOK
If your backend isn't carefully designed, both requests could potentially pass the availability check.

Real booking systems have to handle this kind of race condition.

You don't need to build Booking.com-level infrastructure, but knowing that this problem exists is valuable.

One architectural improvement I'd consider later
Right now you're essentially:

Route
 ↓
Controller
 ↓
Repository
 ↓
Model
As the application grows, you may eventually introduce:

Route
 ↓
Middleware
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Model
 ↓
Database
For example:

bookingController
        ↓
bookingService
        ↓
bookingRepository
        ↓
Booking Model
The service layer is where complicated business logic belongs.

For example:

// bookingService.js

checkRoomAvailability()
calculateBookingPrice()
validateBookingDates()
createBooking()
Then your controller becomes cleaner:

const booking = await bookingService.createBooking(req.body);
You don't have to add this right now. For your current project size, your existing structure is perfectly reasonable.

One small thing I'd clean up
You have:

cofnig/
Rename it to:

config/
So:

config/
├── mongoDb.js
└── mongoose.js
It's a tiny thing, but your GitHub project will look more polished.

Also keep naming consistent:

hotelRoutes.js
hotelController.js
hotelRepository.js
hotelModel.js
rather than mixing singular/plural names unnecessarily.

Overall assessment
I'd rate your current architecture roughly like this:

Area	Assessment
Feature organization	⭐⭐⭐⭐⭐
Route separation	⭐⭐⭐⭐½
Middleware	⭐⭐⭐⭐
Authentication	⭐⭐⭐⭐
Authorization	⭐⭐⭐⭐
Repository pattern	⭐⭐⭐⭐
Database architecture	⭐⭐⭐⭐
Business functionality	⭐⭐⭐⭐½
Validation	🟡 Still working
Error handling	🟡 Still needs polish
Security hardening	🟡 Needs more work
Production readiness	🟡 Not there yet
So yes — you're on the right track.
And honestly, don't completely restructure your project just because you're worried it isn't "industry level."

Your current structure is already good enough to build on.

I'd now do:

                    CURRENT
                       ↓
                Guest Profile
                       ↓
                Admin Profile
                       ↓
                  Validation
                       ↓
              Error handling
                       ↓
           Security / authorization
                       ↓
             Complete testing
                       ↓
                UI polishing
                       ↓
                 README
                       ↓
                  GitHub
After that, stop adding features and start treating the application like a real product: deliberately try to break it, test invalid inputs, test unauthorized access, test edge cases, and fix what fails.

That final phase is what will take your project from "I made a hotel booking project" to "I built and engineered a hotel booking application."


create a readme

Done. I created a professional GitHub-ready README based on what you've actually implemented, without overstating unfinished features.

Download README.md

It covers:

Project overview

Guest & Admin features

Tech stack

Architecture/request flow

Folder structure

Authentication & authorization

Hotel/room management

Booking flow

Admin dashboard

Feedback

Database

Installation/setup

Validation

Security

Future improvements

Learning outcomes

Author section

You can place it directly in the root of your project:

HOTEL_BOOKING/
├── README.md   ← this file
├── app.js
├── package.json
├── features/
├── middleware/
├── views/
└── ...
One thing: before your final GitHub push, update the placeholder values in the README such as <your-github-repository-url> and make sure the .env variable names match your actual .env/config code. 


README.md
Document


Library
/
README.md


🏨 Hotel Booking Application
A full-stack hotel booking web application built with Node.js, Express.js, MongoDB, Mongoose, and EJS.

The application provides separate experiences for Guests and Admins. Guests can search hotels and rooms, make and manage bookings, and submit feedback, while admins can manage hotels, rooms, bookings, users, feedback, and view business statistics through an admin dashboard.

📌 Project Overview
This project was built to practice and demonstrate real-world full-stack development concepts including:

MVC-style architecture

Feature-based project organization

RESTful routing

MongoDB database integration

Mongoose models

JWT authentication

Cookie-based authentication

Role-based authorization

Middleware

Repository pattern

EJS server-side rendering

Image/file uploads

Password reset flow

Admin dashboard

Booking management

Form validation

Error handling

✨ Features
👤 Guest Features
User registration

User login/logout

Forgot password

Reset password

JWT-based authentication

Guest dashboard

Search hotels

View hotel details

View available rooms

Search/filter rooms

View room details

Create room bookings

View booking details

View all bookings

Manage/cancel bookings

Submit feedback

About Us page

Guest profile (in progress)

🔐 Admin Features
Admin authentication

Admin login/logout

JWT-based admin authorization

Admin dashboard

View total users

View total hotels

View total rooms

View total bookings

View total revenue

View recent bookings

Manage hotels

Add and manage rooms

Edit room details

Upload room images

View guest bookings

Update booking status

View guest feedback

Update feedback status

Admin profile (in progress)

🛠️ Tech Stack
Frontend
HTML5

CSS3

Bootstrap

EJS

JavaScript

Backend
Node.js

Express.js

Express Router

Express Validator

JWT

Cookie Parser

Multer

CORS

Database
MongoDB

Mongoose

Other Tools & Packages
bcrypt

dotenv

Winston

express-ejs-layouts

Nodemailer / email-based password reset flow

Git & GitHub

🏗️ Architecture
The project follows a feature-based architecture with separation between routes, controllers, repositories, and models.

Typical request flow:

Client
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
For protected routes:

Request
  ↓
JWT Authentication
  ↓
Authorization
  ↓
Controller
  ↓
Repository
  ↓
Database
📂 Project Structure
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
🔑 Authentication & Authorization
The application uses JWT authentication with cookies.

There are separate authentication flows for:

Guest
  ↓
User JWT
  ↓
Guest Protected Routes
and:

Admin
  ↓
Admin JWT
  ↓
Admin Protected Routes
Admin routes are protected using dedicated admin authorization middleware.

Example:

app.use(
    '/api/admin/hotel',
    adminUser,
    hotelRoutes
);
Guest protected routes follow a similar approach:

app.use(
    '/api/guest/booking',
    currentUser,
    bookingRoutes
);
🏨 Hotel & Room Management
Admin
Admins can:

Add hotels

View hotels

Add rooms

Edit rooms

Upload room images

Set room type

Set room capacity

Set room price

Set room status

Manage room information

Guest
Guests can:

Search hotels

View hotel details

View available rooms

Search rooms based on requirements

View room details

Proceed to booking

📅 Booking Flow
The main booking flow is:

Guest
  ↓
Search Hotel
  ↓
View Hotel Details
  ↓
View Rooms
  ↓
Select Room
  ↓
Enter Booking Details
  ↓
Check Room Availability
  ↓
Create Booking
  ↓
View Booking Details
  ↓
Manage / Cancel Booking
Booking information includes details such as:

User

Room

Check-in date

Check-out date

Number of guests

Price per night

Total amount

Booking status

📊 Admin Dashboard
The admin dashboard provides an overview of the hotel booking system.

Dashboard statistics
Total Users

Total Hotels

Total Rooms

Total Bookings

Total Revenue

Recent Bookings

Confirmed Bookings

This allows administrators to monitor the overall activity of the application from one place.

💬 Feedback Management
Guests can submit feedback through the application.

Admin can:

View feedback

Review feedback details

Update feedback status

Flow:

Guest
  ↓
Submit Feedback
  ↓
Database
  ↓
Admin Dashboard
  ↓
Review / Update Status
🗄️ Database
The application uses MongoDB with Mongoose.

Main data areas include:

Users
Hotels
Rooms
Bookings
Feedback
Relationships are handled using MongoDB ObjectId references where required.

For example:

Booking
 ├── userId
 ├── roomId
 ├── checkIn
 ├── checkOut
 ├── guests
 ├── pricePerNight
 ├── totalAmount
 └── status
⚙️ Installation & Setup
1. Clone the repository
git clone <your-github-repository-url>
2. Move into the project directory
cd hotel_booking
3. Install dependencies
npm install
4. Create a .env file
Example:

PORT=9090

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
Use the variable names required by your current configuration files.

5. Start the application
npm start
The server runs at:

http://localhost:9090
📦 Main Dependencies
express
mongoose
ejs
express-ejs-layouts
jsonwebtoken
bcrypt
cookie-parser
express-validator
multer
cors
dotenv
winston
🧪 Validation & Testing
Validation is being added to improve reliability and prevent invalid data from reaching the database.

Planned/ongoing validation includes:

Registration validation

Login validation

Password validation

Hotel validation

Room validation

Booking validation

Date validation

Guest count validation

ObjectId validation

Feedback validation

File upload validation

Important booking rules include:

Check-out date > Check-in date

Guests >= 1

Guests <= Room maximum capacity

Room price > 0

Room must be available for the selected dates
🔒 Security Considerations
The application currently uses:

Password hashing with bcrypt

JWT authentication

Cookie-based authentication

Protected routes

Admin authorization middleware

Request validation

File upload middleware

Environment variables for sensitive configuration

Further security hardening can include:

Helmet

Rate limiting

CSRF protection

Stronger cookie configuration

More strict file validation

Input sanitization

Additional authorization checks

🚀 Future Improvements
Planned improvements include:

Guest profile

Admin profile

Complete request validation

Improved centralized error handling

More comprehensive automated testing

Improved security hardening

Better UI/UX

Payment gateway integration

Hotel reviews and ratings

Email booking confirmation

Booking cancellation email

Production deployment

🎯 Learning Outcomes
This project helped me gain practical experience with:

Building REST APIs using Express

Structuring a Node.js application

Working with MongoDB and Mongoose

Authentication using JWT

Authorization and protected routes

Password hashing

Cookies

Middleware

MVC architecture

Repository pattern

EJS templating

File uploads

Form validation

Error handling

Logging

Git and GitHub

👨‍💻 Author
Kashish Narang

Full Stack Developer | Node.js | Express.js | MongoDB | JavaScript

📄 License
This project is created for learning and portfolio purposes.

Library
/
README.md


🏨 Hotel Booking Application
A full-stack hotel booking web application built with Node.js, Express.js, MongoDB, Mongoose, and EJS.

The application provides separate experiences for Guests and Admins. Guests can search hotels and rooms, make and manage bookings, and submit feedback, while admins can manage hotels, rooms, bookings, users, feedback, and view business statistics through an admin dashboard.

📌 Project Overview
This project was built to practice and demonstrate real-world full-stack development concepts including:

MVC-style architecture

Feature-based project organization

RESTful routing

MongoDB database integration

Mongoose models

JWT authentication

Cookie-based authentication

Role-based authorization

Middleware

Repository pattern

EJS server-side rendering

Image/file uploads

Password reset flow

Admin dashboard

Booking management

Form validation

Error handling

✨ Features
👤 Guest Features
User registration

User login/logout

Forgot password

Reset password

JWT-based authentication

Guest dashboard

Search hotels

View hotel details

View available rooms

Search/filter rooms

View room details

Create room bookings

View booking details

View all bookings

Manage/cancel bookings

Submit feedback

About Us page

Guest profile (in progress)

🔐 Admin Features
Admin authentication

Admin login/logout

JWT-based admin authorization

Admin dashboard

View total users

View total hotels

View total rooms

View total bookings

View total revenue

View recent bookings

Manage hotels

Add and manage rooms

Edit room details

Upload room images

View guest bookings

Update booking status

View guest feedback

Update feedback status

Admin profile (in progress)

🛠️ Tech Stack
Frontend
HTML5

CSS3

Bootstrap

EJS

JavaScript

Backend
Node.js

Express.js

Express Router

Express Validator

JWT

Cookie Parser

Multer

CORS

Database
MongoDB

Mongoose

Other Tools & Packages
bcrypt

dotenv

Winston

express-ejs-layouts

Nodemailer / email-based password reset flow

Git & GitHub

🏗️ Architecture
The project follows a feature-based architecture with separation between routes, controllers, repositories, and models.

Typical request flow:

Client
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
For protected routes:

Request
  ↓
JWT Authentication
  ↓
Authorization
  ↓
Controller
  ↓
Repository
  ↓
Database
📂 Project Structure
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
🔑 Authentication & Authorization
The application uses JWT authentication with cookies.

There are separate authentication flows for:

Guest
  ↓
User JWT
  ↓
Guest Protected Routes
and:

Admin
  ↓
Admin JWT
  ↓
Admin Protected Routes
Admin routes are protected using dedicated admin authorization middleware.

Example:

app.use(
    '/api/admin/hotel',
    adminUser,
    hotelRoutes
);
Guest protected routes follow a similar approach:

app.use(
    '/api/guest/booking',
    currentUser,
    bookingRoutes
);
🏨 Hotel & Room Management
Admin
Admins can:

Add hotels

View hotels

Add rooms

Edit rooms

Upload room images

Set room type

Set room capacity

Set room price

Set room status

Manage room information

Guest
Guests can:

Search hotels

View hotel details

View available rooms

Search rooms based on requirements

View room details

Proceed to booking

📅 Booking Flow
The main booking flow is:

Guest
  ↓
Search Hotel
  ↓
View Hotel Details
  ↓
View Rooms
  ↓
Select Room
  ↓
Enter Booking Details
  ↓
Check Room Availability
  ↓
Create Booking
  ↓
View Booking Details
  ↓
Manage / Cancel Booking
Booking information includes details such as:

User

Room

Check-in date

Check-out date

Number of guests

Price per night

Total amount

Booking status

📊 Admin Dashboard
The admin dashboard provides an overview of the hotel booking system.

Dashboard statistics
Total Users

Total Hotels

Total Rooms

Total Bookings

Total Revenue

Recent Bookings

Confirmed Bookings

This allows administrators to monitor the overall activity of the application from one place.

💬 Feedback Management
Guests can submit feedback through the application.

Admin can:

View feedback

Review feedback details

Update feedback status

Flow:

Guest
  ↓
Submit Feedback
  ↓
Database
  ↓
Admin Dashboard
  ↓
Review / Update Status
🗄️ Database
The application uses MongoDB with Mongoose.

Main data areas include:

Users
Hotels
Rooms
Bookings
Feedback
Relationships are handled using MongoDB ObjectId references where required.

For example:

Booking
 ├── userId
 ├── roomId
 ├── checkIn
 ├── checkOut
 ├── guests
 ├── pricePerNight
 ├── totalAmount
 └── status
⚙️ Installation & Setup
1. Clone the repository
git clone <your-github-repository-url>
2. Move into the project directory
cd hotel_booking
3. Install dependencies
npm install
4. Create a .env file
Example:

PORT=9090

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
Use the variable names required by your current configuration files.

5. Start the application
npm start
The server runs at:

http://localhost:9090
📦 Main Dependencies
express
mongoose
ejs
express-ejs-layouts
jsonwebtoken
bcrypt
cookie-parser
express-validator
multer
cors
dotenv
winston
🧪 Validation & Testing
Validation is being added to improve reliability and prevent invalid data from reaching the database.

Planned/ongoing validation includes:

Registration validation

Login validation

Password validation

Hotel validation

Room validation

Booking validation

Date validation

Guest count validation

ObjectId validation

Feedback validation

File upload validation

Important booking rules include:

Check-out date > Check-in date

Guests >= 1

Guests <= Room maximum capacity

Room price > 0

Room must be available for the selected dates
🔒 Security Considerations
The application currently uses:

Password hashing with bcrypt

JWT authentication

Cookie-based authentication

Protected routes

Admin authorization middleware

Request validation

File upload middleware

Environment variables for sensitive configuration

Further security hardening can include:

Helmet

Rate limiting

CSRF protection

Stronger cookie configuration

More strict file validation

Input sanitization

Additional authorization checks

🚀 Future Improvements
Planned improvements include:

Guest profile

Admin profile

Complete request validation

Improved centralized error handling

More comprehensive automated testing

Improved security hardening

Better UI/UX

Payment gateway integration

Hotel reviews and ratings

Email booking confirmation

Booking cancellation email

Production deployment

🎯 Learning Outcomes
This project helped me gain practical experience with:

Building REST APIs using Express

Structuring a Node.js application

Working with MongoDB and Mongoose

Authentication using JWT

Authorization and protected routes

Password hashing

Cookies

Middleware

MVC architecture

Repository pattern

EJS templating

File uploads

Form validation

Error handling

Logging

Git and GitHub

👨‍💻 Author
Kashish Narang

Full Stack Developer | Node.js | Express.js | MongoDB | JavaScript

📄 License
This project is created for learning and portfolio purposes.

