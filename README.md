# URL Shortener & QR Code Generator - Backend

A RESTful API built with **Express.js** that shortens long URLs, generates QR codes, and tracks link analytics.

## ✨ Features

- 🔗 **URL Shortening** — Convert long URLs into short, shareable links
- 📱 **QR Code Generation** — Generate downloadable QR codes for any URL
- 📊 **Link Analytics** — Track clicks and usage statistics
- ✅ **URL Validation** — Ensures only valid URLs are processed
- 🔒 **Rate Limiting** — Prevents abuse of API endpoints
- 🌐 **CORS Enabled** — Ready for frontend integration
- ⚡ **Fast & Lightweight** — Minimal dependencies, quick responses

## 🛠 Tech Stack

- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **MongoDB** — Database (via Mongoose)
- **qrcode** — QR code generation
- **nanoid** — Unique short code generation
- **dotenv** — Environment configuration
- **cors** & **express-rate-limit** — Security middleware

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/shorten` | Shorten a long URL |
| `GET` | `/:shortCode` | Redirect to original URL |
| `POST` | `/api/qr` | Generate a QR code for a URL |
| `GET` | `/api/stats/:shortCode` | Get click statistics for a link |
| `DELETE` | `/api/url/:shortCode` | Delete a shortened URL |

### Example Request

**POST** `/api/shorten`

```json
{
  "url": "https://example.com/very/long/path"
}
```

**Response**

```json
{
  "shortUrl": "http://localhost:5000/abc123",
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very/long/path"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

### Run the Server

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server will be running at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/         # Database & environment config
│   ├── controllers/    # Route logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── utils/          # Helper functions
├── .env
├── .gitignore
├── package.json
└── server.js           # Entry point
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm start` | Start production server |
| `npm test` | Run test suite |

## 🔐 Security Notes

- Rate limiting applied to prevent abuse
- Input validation on all endpoints
- CORS configured for trusted origins
- Environment variables for sensitive data

## 📄 License

MIT © Mbata Lawrence