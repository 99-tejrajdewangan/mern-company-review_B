# Review&RATE - Backend

RESTful API server for the Review&RATE application. Handles user authentication, company management, reviews, and ratings.

## Features

- 🔐 JWT-based authentication (signup / login)
- 🏢 CRUD operations for companies
- ⭐ Create, read, and like reviews
- 🗺️ Filter companies by name and city
- 📊 Sort reviews by date, rating, or relevance
- 📈 Average rating calculation for each company
- 🛡️ Protected routes for authenticated actions

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JSON Web Token | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| cors | Cross-origin resource sharing |

## Prerequisites

- Node.js **v16.x** or higher
- MongoDB **v6.x** (local or cloud instance like MongoDB Atlas)
- npm or yarn

## Installation & Setup

1. Clone the repository

git clone https://github.com/99-tejrajdewangan/mern-company-review_B
cd review-rate-backend

2. Install dependencies
npm install

3. Configure Environment Variables
Create a .env file in the root directory:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/reviewrate
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development

PORT	Server port	5000
MONGODB_URI	MongoDB connection string	mongodb://localhost:27017/reviewrate
JWT_SECRET	Secret key for signing JWT tokens	required
NODE_ENV	Environment (development/production)	development
Important: Use a strong, unique JWT_SECRET in production.

4. Start MongoDB
Make sure MongoDB is running locally or MongoDB Atlas

5. Run the Server
Development mode (auto-restart with nodemon)

npm run dev
Production mode
npm start
The server will start on http://localhost:5000.

API Endpoints
All endpoints are prefixed with /api.

Authentication
Method	Endpoint	Description	Auth Required
POST	/auth/register	Register a new user	No
POST	/auth/login	Login user, returns JWT	No
Request body (register):

json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
Request body (login):

json
{
  "email": "john@example.com",
  "password": "secret123"
}
Companies
Method	Endpoint	Description	Auth Required
GET	/companies	Get all companies (with filtering)	No
GET	/companies/:id	Get single company by ID	No
POST	/companies	Add a new company	Yes
PUT	/companies/:id	Update a company	Yes
DELETE	/companies/:id	Delete a company	Yes
Query parameters for GET /companies:

name (string) – filter by company name (partial match)

city (string) – filter by city

Request body (POST /companies):

json
{
  "name": "Acme Corp",
  "location": "Downtown, Main Street",
  "foundedOn": "2016-01-01",
  "city": "Indore",
  "logo": "https://example.com/logo.png",
  "description": "A leading company in software development."
}
Reviews
Method	Endpoint	Description	Auth Required
GET	/reviews	Get reviews for a company (with sorting)	No
POST	/reviews	Add a review to a company	Yes
PUT	/reviews/:id/like	Like/unlike a review	Yes
Query parameters for GET /reviews:

companyId (string, required) – ID of the company

sort (string) – date, rating, or relevance (default: date)

Request body (POST /reviews):

json
{
  "companyId": "65f1a2b3c4d5e6f7a8b9c0d1",
  "fullName": "Jane Smith",
  "subject": "Great service!",
  "reviewText": "The team was very professional and delivered on time.",
  "rating": 5
}
Database Schema
User Model
javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
Company Model
javascript
{
  name: String,
  location: String,
  foundedOn: Date,
  city: String,
  logo: String,
  description: String,
  averageRating: Number (default: 0),
  reviewCount: Number (default: 0)
}
Review Model
javascript
{
  companyId: ObjectId (ref: 'Company'),
  fullName: String,
  subject: String,
  reviewText: String,
  rating: Number (1-5),
  likes: Number (default: 0),
  createdAt: Date (default: Date.now)
}
Authentication Middleware
Protected routes require a valid JWT in the Authorization header:

text
Authorization: Bearer <your_jwt_token>
The middleware extracts the user ID from the token and attaches it to req.userId.

Error Handling
All API responses follow a consistent format:

Success:

json
{
  "success": true,
  "data": { ... }
}
Error:

json
{
  "success": false,
  "message": "Error description"
}
Common HTTP status codes:

200 – OK

201 – Created

400 – Bad request (validation error)

401 – Unauthorized (missing/invalid token)

404 – Not found

500 – Internal server error

Testing with Postman / cURL
Register a user
bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'
Login
bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
Add a company (authenticated)
bash
curl -X POST http://localhost:5000/api/companies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"TechCorp","location":"Silicon Valley","foundedOn":"2020-01-01","city":"San Francisco","logo":"https://example.com/logo.png","description":"Innovative tech solutions."}'
Get companies filtered by city
bash
curl "http://localhost:5000/api/companies?city=Indore"
Deployment
Deploy to Render / Railway / Heroku
Push your code to a Git repository.

Create a new web service on your preferred platform.

Set the environment variables (PORT, MONGODB_URI, JWT_SECRET, NODE_ENV).

Use npm start as the start command.