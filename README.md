# 🥗 NutriTrack — Your Food Knows. Your Body Knows. Now Your App Knows. 💀🔥

> **An Indian-first full-stack nutrition & meal planning platform that turns “bro what did I even eat today?” into actual data.**

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge" />
</p>

<p align="center">
  <b>🍛 Idli?</b> Tracked.<br/>
  <b>🥘 Biryani?</b> Tracked.<br/>
  <b>💧 8 glasses of water?</b> Tracked.<br/>
  <b>📈 Progress?</b> Tracked.<br/>
  <b>🍕 “I'll start dieting tomorrow”?</b> ❌ We don't support that feature.
</p>

---

## 🚀 What is NutriTrack?

**NutriTrack** is a full-stack nutrition management platform built to make healthy eating less boring, less complicated, and significantly more data-driven.

Instead of juggling five different apps for:

- 🍽️ Meal tracking
- 🥗 Nutrition analysis
- 💧 Water intake
- ⚖️ Weight progress
- 📊 Analytics
- 🏆 Achievements
- 🍛 Food discovery
- 👤 Health profile

...NutriTrack puts everything into **one dashboard**.

And yes — it understands **Indian food**.

Because apparently calories don't disappear just because the food is called:

> *“Just one small dosa bro.”* 💀

---

# ✨ Features

## 🏠 1. Intelligent Dashboard

Your nutrition command center.

The dashboard brings together:

- Daily calorie intake
- Protein consumption
- Carbohydrates
- Fats
- Water intake
- Daily goals
- Meal summaries
- Progress indicators
- Quick actions

So instead of opening 17 tabs to understand your day...

**one screen tells the story.**

---

# 🍽️ 2. Meal Planner

Plan and track meals across:

- 🌅 Breakfast
- ☀️ Lunch
- 🌙 Dinner
- 🍿 Snacks

Each meal can contain multiple food items with nutrition information.

### Nutrition calculated for every meal

```text
Calories
Protein
Carbohydrates
Fats
Fiber
Sugar
```

And because portion size matters:

```text
Food
+ Quantity
+ Serving Unit
        ↓
Nutrition Calculation
        ↓
Meal Total
```

---

# 🇮🇳 3. Indian Food Library

This is where things get serious. 👀

NutriTrack comes with a curated food database covering a wide range of Indian dishes.

### South Indian 🍛

- Idli
- Dosa
- Masala Dosa
- Rava Dosa
- Onion Dosa
- Pesarattu
- Adai
- Pongal
- Upma
- Medu Vada
- Uttapam
- Appam
- Puttu
- Idiyappam
- Kuzhi Paniyaram
- Ragi Dosa
- Curd Rice
- Lemon Rice
- Tamarind Rice
- Coconut Rice
- Sambar
- Rasam
- Avial
- Poriyal
- Kootu
- Veg Kurma
- Chicken 65
- Chettinad Chicken
- Fish Curry
- Fish Fry
- Prawn Masala
- Kothu Parotta
- Filter Coffee
- Buttermilk
- Tender Coconut Water

### North Indian 🫓

- Chapati
- Tandoori Roti
- Naan
- Butter Naan
- Aloo Paratha
- Gobi Paratha
- Paneer Paratha
- Poori
- Chole Bhature
- Chole
- Rajma
- Dal Tadka
- Dal Makhani
- Kadhi
- Palak Paneer
- Matar Paneer
- Paneer Butter Masala
- Aloo Gobi
- Baingan Bharta
- Butter Chicken
- Tandoori Chicken
- Chicken Tikka
- Chicken Curry
- Mutton Curry
- Biryani
- Jeera Rice
- Pulao
- Kebabs
- Lassi

And plenty of everyday foods, fruits, beverages, snacks and desserts.

### ⚠️ Important

Nutrition values are **approximate** and based on typical serving sizes.

Because one aunty's biryani can contain enough oil to start a small power plant. 😭

---

# 💧 4. Water Tracker

Because apparently humans need water.

Track:

```text
🥤 Glasses
💧 Millilitres
🎯 Daily Goal
📈 Progress
```

The backend supports incremental water logging with a default:

**1 glass = 250ml**

Default daily goal:

**8 glasses**

---

# ⚖️ 5. Progress Tracking

Track your journey over time.

Record:

- Weight
- Body measurements
- Body fat percentage
- Progress photos
- Notes
- Date-based progress

Turn:

```text
"I think I'm progressing..."
```

into:

```text
📊 ACTUAL DATA
```

---

# 📊 6. Analytics

Because numbers are prettier when they're inside charts.

Analyze:

- Calorie trends
- Macronutrient intake
- Meal patterns
- Water consumption
- Progress over time

The application communicates with backend analytics APIs rather than relying entirely on frontend calculations.

---

# 🏆 7. Achievements

Consistency deserves dopamine.

NutriTrack includes an achievement system designed around healthy tracking habits.

Because:

```text
Logging meals
     ↓
Consistency
     ↓
Achievement
     ↓
🎉 dopamine
     ↓
Log another meal
```

Human psychology has entered the chat.

---

# 👤 8. Profile & Nutrition Goals

Customize your nutrition journey with:

- Age
- Gender
- Height
- Current weight
- Target weight
- Goal type
- Daily calorie goal
- Protein goal
- Carb goal
- Fat goal
- Diet preference
- Allergies
- Favourite foods

Supported diet preferences include:

```text
None
Vegetarian
Vegan
Pescatarian
Keto
Paleo
```

---

# 🔐 9. Authentication

Secure account-based application flow using:

### 🔑 JWT Authentication

```text
Signup
   ↓
Password authentication
   ↓
JWT generated
   ↓
Authenticated API requests
```

Also supports Google authentication integration through:

```text
@react-oauth/google
```

---

# 🧠 10. Chatbot Interface

There's also a nutrition assistant interface inside the application.

But here's something important:

> **We don't fake AI.**

The current backend does not expose a dedicated AI inference endpoint, so the interface is structured to be extended with an actual AI model later.

Future possibilities:

```text
User
 ↓
Nutrition Assistant
 ↓
LLM
 ↓
Meal analysis
 ↓
Personalized suggestions
 ↓
Nutrition insights
```

No fake `"AI generated"` nonsense just for a README badge. 😭

---

# 🏗️ Architecture

NutriTrack follows a clean client-server architecture.

```text
                    ┌─────────────────────┐
                    │      USER 👤        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      Vite + UI      │
                    └──────────┬──────────┘
                               │
                         HTTP / REST
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Express.js Server  │
                    │       Node.js       │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
        Auth Routes       Meal Routes       Food Routes
             │                 │                 │
             └─────────────────┼─────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │      MongoDB        │
                    │    Persistence      │
                    └─────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| ⚛️ React 18 | UI development |
| ⚡ Vite | Development & build tooling |
| 🎨 CSS | Responsive interface |
| 🧭 React Router | Application navigation |
| 📡 Axios | API communication |
| 🎯 Lucide React | UI icons |
| 🔐 React OAuth | Google authentication |

## Backend

| Technology | Purpose |
|---|---|
| 🟢 Node.js | Runtime |
| 🚂 Express.js | REST API |
| 🍃 MongoDB | Database |
| 🧩 Mongoose | MongoDB ODM |
| 🔑 JWT | Authentication |
| 🔒 bcryptjs | Password hashing |
| 🌐 CORS | Cross-origin requests |
| ⚙️ dotenv | Environment configuration |

---

# 🗂️ Project Structure

```text
Online-Meal-Planner-and-Nutrition-Tracker/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   ├── Meal.js
│   │   ├── Food.js
│   │   ├── Water.js
│   │   └── Progress.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── meals.js
│   │   ├── foods.js
│   │   ├── water.js
│   │   └── progress.js
│   │
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

# 🔌 REST API

The backend exposes RESTful endpoints under:

```text
/api
```

## Authentication

```http
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/google
GET  /api/auth/me
PUT  /api/auth/profile
```

## Meals

```http
POST   /api/meals
GET    /api/meals/date/:date
GET    /api/meals/range
GET    /api/meals/analytics
PUT    /api/meals/:id
DELETE /api/meals/:id
```

## Foods

```http
GET    /api/foods/search
GET    /api/foods/category/:category
GET    /api/foods/custom
POST   /api/foods
DELETE /api/foods/:id
```

## Water

```http
GET  /api/water/:date
PUT  /api/water/:date
POST /api/water/:date/increment
```

## Progress

```http
POST   /api/progress
GET    /api/progress
GET    /api/progress/latest
DELETE /api/progress/:id
```

## Health Check

```http
GET /api/health
```

Expected response:

```json
{
  "status": "OK"
}
```

---

# 🧮 Nutrition Data Model

Each food item can store:

```json
{
  "name": "Masala Dosa",
  "quantity": 1,
  "unit": "serving",
  "calories": 387,
  "protein": 8,
  "carbs": 56,
  "fats": 14,
  "fiber": 3,
  "sugar": 3
}
```

Meals aggregate nutrition information from their individual food items.

```text
Food Item 1 ─┐
Food Item 2 ─┤
Food Item 3 ─┤
Food Item 4 ─┘
       ↓
   Meal Total
       ↓
 Daily Nutrition
```

---

# 🔄 Application Flow

### Logging a meal

```text
User selects food
       ↓
Chooses quantity
       ↓
Selects meal type
       ↓
Frontend sends POST request
       ↓
Express route
       ↓
Mongoose model
       ↓
MongoDB
       ↓
Nutrition totals calculated
       ↓
Updated dashboard
```

---

# ⚙️ Getting Started

## 1️⃣ Clone

```bash
git clone https://github.com/diyavinod1/Online-Meal-Planner-and-Nutrition-Tracker.git
cd Online-Meal-Planner-and-Nutrition-Tracker
```

---

# 📦 Backend Setup

```bash
cd backend
npm install
```

Create:

```text
.env
```

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

Start the development server:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create:

```text
.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_web_client_id
```

Run:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🌱 Environment Variables

### Backend

```env
MONGODB_URI=
JWT_SECRET=
PORT=
```

### Frontend

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

### 🚨 Never commit

```text
.env
```

to GitHub.

Secrets belong in environment variables.

Not in:

```text
README.md ❌
GitHub commits ❌
Screenshots ❌
LinkedIn posts ❌
```

---

# 🧪 Development Philosophy

NutriTrack was built around a few principles:

### 01 — Real APIs > Fake UI

The frontend communicates with an actual backend.

### 02 — Data > Guesswork

Nutrition information is represented as structured data.

### 03 — Indian food matters

A nutrition tracker shouldn't assume everyone survives on:

```text
Chicken + Broccoli + Protein Shake
```

😭

### 04 — Extensible architecture

The system is structured so additional functionality can be added without rebuilding the entire application.

---

# 🚀 Future Roadmap

## 🤖 AI Nutrition Coach

```text
User profile
     +
Meal history
     +
Nutrition goals
     +
Activity
     ↓
LLM
     ↓
Personalized nutrition assistant
```

## 🎙️ Voice Meal Logging

Imagine:

> **"Bro I ate two idlis, one vada and a filter coffee."**

And the app automatically creates:

```text
Breakfast
├── Idli × 2
├── Medu Vada × 1
└── Filter Coffee × 1
```

Now THAT would be dangerous. 😂

## 📸 Food Image Recognition

```text
📷 Upload food image
       ↓
Computer Vision
       ↓
Food Detection
       ↓
Portion Estimation
       ↓
Nutrition Estimation
```

## 🧠 Personalized Recommendations

```text
Nutrition history
        +
Goals
        +
Preferences
        +
Allergies
        ↓
Recommendation Engine
        ↓
"Here's what you could eat next."
```

## 📱 Mobile Application

```text
React Native
      +
Existing REST API
      =
NutriTrack Mobile
```

---

# 🔐 Security Notes

The application uses:

- JWT-based authentication
- Password hashing
- Protected API routes
- Environment variables for secrets
- CORS configuration
- MongoDB-backed persistence

For production deployment, additional hardening can include:

- Refresh token rotation
- Rate limiting
- Request validation
- HTTPS enforcement
- Secure cookie strategy
- Stronger OAuth token verification
- Security headers
- Audit logging

---

# 📈 Why This Project Exists

Nutrition applications often become either:

```text
Too complicated 🤯
```

or

```text
Too basic 🥱
```

NutriTrack aims for the middle:

> **Simple enough to use every day.  
> Technical enough to actually build something serious.**

---

# 🎨 Design Philosophy

The UI focuses on:

```text
Clean
   +
Friendly
   +
Data-driven
   +
Fast
   +
Human
```

Instead of making users feel like they're operating a NASA control room just to log breakfast.

---

# 🤝 Contributing

Want to improve NutriTrack?

```bash
git clone <repo>
git checkout -b feature/amazing-feature
```

Make your changes.

Then:

```bash
git add .
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
```

Open a pull request.

---

# ⭐ Star the Repository

If this project helped you, inspired you, or made you hungry:

```text
⭐ Star
```

It's free.

Unlike paneer. 😭

---

# 👩‍💻 Author

## Diya Vinod

**Computer Science Engineering — AI & ML**

Building things around:

```text
🤖 AI / ML
💻 Full Stack Development
🧠 Generative AI
⚡ Problem Solving
🎨 Product Design
```

🌐 **Portfolio:** [diyavinod.com](https://diyavinod.com)  
💻 **GitHub:** [@diyaVinod1](https://github.com/diyaVinod1)

---

# 🍛 Final Thought

Most apps say:

> **"Track your food."**

NutriTrack says:

> **"Okay bro, WHAT DID YOU EAT?"** 👀

Because your body already keeps the score.

**We just built the dashboard.** 📊🔥

---

<p align="center">

### 🥗 Eat. Track. Understand. Improve.

### Built with ❤️, JavaScript, MongoDB and questionable amounts of coffee.

**⭐ If you like it, star it.**

</p>
