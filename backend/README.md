# VoyageAI Backend
Backend for **VoyageAI**, an AI-powered travel planning application built with **Node.js, Express.js, MongoDB, and Groq API**.

VoyageAI helps users plan trips, get AI-powered travel recommendations, estimate travel costs, and interact with an AI travel assistant.

---

## 🌐 Live Demo

🚀 https://voyage-ai-frontend-beta.vercel.app/login

## 🔗 Frontend Repository

https://github.com/pandeyajey9/VoyageAI---Frontend

---

## 🚀 Features

- 🔐 JWT Authentication
- 🔒 Password Hashing with bcrypt
- 👤 User Registration & Login
- 🧳 Create, Update & Delete Trips
- ❤️ Favourite Destinations
- 🤖 AI-Powered Trip Planning
- 💬 AI Travel Assistant
- 💰 AI-Based Budget Estimation
- 📍 Destination Recommendations
- 🍴 Local Food Recommendations
- 🏨 Stay Recommendations
- 🚗 Transportation Suggestions
- 🗄️ MongoDB Database Integration
- 📡 RESTful API Architecture

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Groq API
- dotenv
- CORS

---

## 🏗️ Backend Architecture

VoyageAI follows a layered architecture to keep the backend modular and maintainable.

```text
Client
  ↓
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
MongoDB
```

### Project Structure

```text
src
│
├── config
├── controllers
├── middleware
├── models
├── repositories
├── routes
├── services
├── utils
├── app.js
└── server.js
```

---

## 🤖 AI Integration

VoyageAI uses the **Groq API** for its AI-powered travel features.

The AI can generate travel recommendations based on:

- Destination
- Travel duration
- Number of travellers
- Travel mode
- Budget

The generated recommendations can include:

- Places to visit
- Local food
- Stay areas
- Transportation options
- Attractions & activities
- Approximate travel costs
- Travel tips

The AI also checks the user's budget and provides realistic cost estimates instead of generating unrealistic prices.

---

## 💬 AI Travel Assistant

VoyageAI includes a dedicated AI chatbot where users can directly ask travel-related questions.

Users can ask things like:

- Suggest peaceful places in India
- Best adventure destinations
- Best beach destinations
- Romantic places for couples
- Budget-friendly destinations
- Places to visit in a specific city

Users can also ask their own travel-related questions and continue the conversation with the AI assistant.

---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET
GROQ_API_KEY=YOUR_GROQ_API_KEY
```
---

## 📦 Installation

```bash
git clone https://github.com/YOUR_USERNAME/VoyageAI-Backend.git
cd VoyageAI-Backend
npm install
npm run dev
```

The server will run on:

```text
http://localhost:5000
```

---

## 🚀 Deployment

**Backend:**  
https://voyageai-backend-z5qe.onrender.com

**Frontend:**  
https://voyage-ai-frontend-beta.vercel.app/login

---

## 👨‍💻 Author

**Ajey Pandey**

Computer Science Engineering Student  
Bharati Vidyapeeth's College of Engineering, Delhi

LinkedIn: www.linkedin.com/in/ajey-pandey-5b477b329

---

⭐ If you found VoyageAI useful, consider giving the repository a Star!
