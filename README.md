# Lead Management System (RBAC)

A Lead Management System built with **Node.js + Express + MongoDB**.  
Implements **Role-Based Access Control (RBAC)** using JWT authentication.

---

## 🚀 Features
- **Authentication** with JWT stored in cookies.
- **Roles**:
  - **Admin** → can view all leads, update status, and delete leads.
  - **User** → can create leads and view only their own leads.
- **Lead fields**: `name`, `email`, `phone`, `source`, `message`, `status`.

---

## 🛠️ Setup Instructions

### 1. Prerequisites
Make sure the following are installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on default port `27017`)

### 2. Install Dependencies
Run:
npm install

### 3. Configure Environment Variables
Create a .env file in the project root:
env
PORT=4000
JWT_SECRET=lead@123
MONGO_URI=mongodb://localhost:27017/lead_management

### 4. Start MongoDB
Make sure MongoDB is running locally:
mongod

### 5. Run the Server
Start the Express app:
npm start


## Sample Credentials (For Testing)
Admin
Email: admin@example.com
Password: admin@123

User
Email: user1@example.com
Password: user1@123


## 📬 API Endpoints
Auth
POST /api/auth/register → Register new user

POST /api/auth/login → Login (sets JWT cookie)

Leads
POST /api/leads → Create a lead (User/Admin)

GET /api/leads → Get leads (User: own, Admin: all)

GET /api/leads/:id → Get lead by ID (User: own, Admin: all)

PATCH /api/leads/:id/status → Update lead status (Admin only)

DELETE /api/leads/:id → Delete lead (Admin only)


## ✅ Notes
Admin and User1 are auto-seeded when the app starts.

Leads must be created via API calls (not auto-seeded).

Works with local MongoDB
