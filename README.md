# 🌾 Harvest Hub

**Harvest Hub** - Every Farmer's Digital Companion

An AI-powered digital farming platform that helps farmers detect crop health, pests, and diseases early, provides irrigation guidance, and offers localized weather updates.

## 👤 Author

**gagan singh**  
Email: gagansingh2005.8@gmail.com  
GitHub: [@gagansingh0805](https://github.com/gagansingh0805)

## 🚀 Features

- **AI-Powered Plant Disease Detection** - Upload photos to detect crop diseases and pests
- **Weather Monitoring** - Real-time weather data and forecasts
- **Crop Management** - Track and manage your crops
- **Government Schemes** - Information about agricultural schemes and benefits
- **Market Analytics** - Market prices and trends
- **AI Agricultural Expert** - Chat with AI for farming advice
- **Multi-language Support** - Available in multiple languages

## 📁 Project Structure

```
Harvest-Hub/
├── Frontend/          # React + Vite frontend application
├── backend/           # Node.js + Express backend API
└── README.md          # This file
```

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Recharts

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication
- OpenAI API
- bcryptjs

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- OpenAI API key (for AI features)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` directory:

```env
VITE_OPENAI_API_KEY=your_openai_api_key
```

Start the development server:

```bash
npm run dev
```

## 📝 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Plants

- `POST /api/plants/analyze` - AI plant disease detection

### Crops

- `GET /api/crops` - Get all user crops
- `POST /api/crops` - Add new crop
- `PUT /api/crops/:id` - Update crop
- `DELETE /api/crops/:id` - Delete crop

### Weather

- `GET /api/weather/current` - Get current weather
- `GET /api/weather/forecast` - Get weather forecast

## 🔐 Environment Variables

See `SIGNUP_TEST_DATA.md` for testing credentials and setup instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Made with ❤️ by gagan singh**
