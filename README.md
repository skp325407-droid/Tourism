# 🇮🇳 TOURISM Web App

A clean, responsive full-stack tourism web application built with **React**, **Vite**, **Modern CSS**, **Node.js**, **Express**, and **MongoDB**.

Explore tourist attractions, history, climate, travel seasons, navigation maps, weather forecasts, and resort bookings across all 28 Indian States.

---

## 🌟 Features

- **User Registration & Login:** Stores user accounts in the MongoDB `test` database (`registers` collection).
- **28 Indian States:** Comprehensive guides for all states with scenic imagery and curated spots.
- **Instant Search:** Dynamic filter bar to instantly locate states.
- **Interactive State Portals:**
  - 🏛️ History & Heritage
  - 🌤️ Climate & Weather
  - 📅 Best Season to Visit
  - 📍 Direct Google Maps integration
  - 🌤️ Real-time Weather links
  - 🏨 Hotel & Resort booking links
  - 📸 Interactive Photo Gallery (Album Slider)
- **Traveler Reviews System:**
  - Submit ratings (1-5 stars) and comments
  - Live review list powered by Express REST API and MongoDB (`reviews` collection in `test` database)
  - Resilient storage fallback ensures zero downtime
- **Modern Responsive Design:**
  - Pure CSS Grid and Flexbox layouts
  - Mobile, tablet, and desktop responsive
  - Accessible slide-in navigation drawer with backdrop blur

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, React Router DOM v7, CSS Grid & Flexbox
- **Backend:** Node.js, Express.js 5, CORS, Mongoose 9
- **Database:** MongoDB `test` database (`registers` & `reviews` collections)

---

## 🚀 Quick Start Guide

### 1. Start Backend Server
```bash
cd backend
npm install
npm run start
```
*Server runs on:* `http://localhost:7000`

### 2. Start Frontend Web App
```bash
cd web
npm install
npm run dev
```
*Frontend runs on:* `http://localhost:5173`

---

## 📖 Technical Documentation & Dashboard Walkthrough
For full technical dashboard explanations and interview preparation, see:
👉 [INTERVIEW_PREPARATION.md](./INTERVIEW_PREPARATION.md)
