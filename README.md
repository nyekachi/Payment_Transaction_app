# 🧚‍♀️ Fairy Vault — Enchanted Treasury & Banking

Inspired by the magical world of Disney's *Tinkerbell* and Pixie Hollow, **Fairy Vault** imagines what a daily banking and financial management system would look like for fairies. 

From collecting seasonal tribute berries and foraging stipends to paying for cobweb Wi-Fi networks and glow-worm lantern utilities, this application translates standard fintech workflows into an enchanted grove treasury.

---

## ✨ How It Works

1. **Grove Authentication & Auto-Seeding:**
   - Fairies can register and log in to their personal vault using secure JWT token authorization.
   - Newly registered accounts are instantly seeded with an initial banking history across fairy-specific categories to emulate an active account from day one.

2. **The Fairy Express Debit Pass:**
   - An interactive, frosted teal virtual debit card.
   - Includes real-time card controls: toggleable card number visibility for privacy and an instant lock/freeze feature.

3. **Pixie Tide Flow Pattern:**
   - A multi-day financial velocity area chart that plots the inflow and outflow of fairy gold and dewdrops over time.

4. **Grove Ledger Management:**
   - Full CRUD capability: Record incoming harvests (income) or offerings (expenses), categorize entries under custom fairy tags (*Pixie Dust ✨*, *Dewdrops 💧*, *Acorns & Seeds 🌰*, *Nectar & Honey 🍯*, *Dragon Scales 🐉*, *Moonlight Charms 🌙*), and dissolve old records.

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React (icons), Recharts (data visualization), Axios
- **Backend:** Node.js, Express.js, JSON Web Tokens (JWT), Bcrypt.js, CORS
- **Database:** MongoDB Atlas & Mongoose ODM

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5001
MONGO_URI=local_mongodb_connection_string
JWT_SECRET=local_jwt_secret
CLIENT_URL=http://localhost:5173