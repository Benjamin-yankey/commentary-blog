# { DevLog } — Where Code Meets Great Writing

<div align="center">

![DevLog Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop)

**A premium developer publishing platform built with React, Node.js, PostgreSQL, and Docker.**

[![License: MIT](https://img.shields.io/badge/License-MIT-00ff9d.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-00ff9d.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-58a6ff.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-3776ab.svg)](https://www.postgresql.org/)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 🌟 Features

### **For Writers**
- ✍️ **Rich Editor** with formatting toolbar and markdown support
- 🖼 **Cover Images** with automatic fallback handling
- 🏷 **Tag System** with color-coded categories (JavaScript, React, Python, Rust, AI/ML, etc.)
- 💾 **Auto-Save** with real-time word count and read time estimation
- 📊 **Post Analytics** (likes, comments, views)

### **For Readers**
- 🔍 **Smart Search** across posts, tags, and authors
- 🎨 **Premium Dark UI** with neon green accents and glassmorphism
- 📱 **Fully Responsive** design for mobile, tablet, and desktop
- 🔥 **Trending Tags** and leaderboard system
- 💬 **Comment System** with nested replies
- 👥 **Author Profiles** with follow functionality

### **For Developers**
- 🐳 **Docker Compose** for one-command deployment
- 🔐 **JWT Authentication** with bcrypt password hashing
- 🗄 **PostgreSQL** with automatic schema initialization
- 🚀 **CI/CD Pipeline** with Jenkins integration
- 📦 **Production-Ready** with multi-stage Docker builds
- 🌐 **Network Access** via local IP for cross-device testing

---

## 🎨 Design System

DevLog uses a **terminal-meets-editorial** aesthetic with:

- **Typography**: JetBrains Mono (headings/code) + Sora (body)
- **Colors**: Deep blacks (#080c10) with neon green (#00ff9d) accents
- **Effects**: Backdrop blur, radial gradients, smooth animations
- **Components**: Custom scrollbars, focus rings, hover states

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Benjamin-yankey/commentary-blog.git
cd commentary-blog

# Start with Docker Compose (recommended)
docker-compose up -d --build

# Access the application
open http://localhost:5001
```

The application will be available at:
- **Local**: `http://localhost:5001`
- **Network**: `http://YOUR_LOCAL_IP:5001` (e.g., `http://192.168.6.37:5001`)

### Local Development (without Docker)

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..

# Set up environment variables
cp .env.example .env

# Start PostgreSQL (via Docker or local install)
# Update .env with your database credentials

# Run backend
npm run dev

# Run frontend (in another terminal)
cd client && npm start
```

---

## 📂 Project Structure

```
commentary-blog/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── PostCard.jsx
│       │   ├── Footer.jsx
│       │   └── ...
│       ├── pages/          # Route pages
│       │   ├── Home.jsx
│       │   ├── Tags.jsx
│       │   ├── Leaderboard.jsx
│       │   ├── PostView.jsx
│       │   ├── CreatePost.jsx
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       └── index.css       # Design system tokens
├── src/                    # Node.js backend
│   ├── config/
│   │   └── database.js     # PostgreSQL connection & initialization
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── categoryController.js
│   ├── routes/
│   ├── middleware/
│   └── app.js
├── tests/                  # Jest unit tests
├── docker-compose.yml      # Multi-container orchestration
├── Dockerfile              # Multi-stage production build
├── Jenkinsfile             # CI/CD pipeline
└── README.md
```

---

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Posts Table
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  image_url VARCHAR(500),
  image_alt VARCHAR(200),
  excerpt TEXT,
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  icon_url VARCHAR(500),
  color VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Comments Table
```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)

### Categories
- `GET /api/categories` - Get all categories

### Comments
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments/post/:postId` - Add a comment (requires auth)
- `DELETE /api/comments/:commentId` - Delete a comment (requires auth)

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint
```

---

## 🚢 Deployment

### Docker Production Build

```bash
# Build and run production containers
docker-compose up -d --build

# View logs
docker-compose logs -f app

# Stop containers
docker-compose down
```

### CI/CD with Jenkins

The project includes a `Jenkinsfile` that:
1. Installs dependencies
2. Runs ESLint for code quality
3. Executes Jest unit tests
4. Generates JUnit test reports
5. Archives test results

---

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5001
NODE_ENV=production

# Database
DB_HOST=db
DB_PORT=5432
DB_NAME=commentary_blog
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Client
REACT_APP_API_URL=/api
```

---

## 🎯 Roadmap

- [ ] Search functionality with Elasticsearch
- [ ] Real-time notifications system
- [ ] Markdown editor with live preview
- [ ] User profile pages
- [ ] Post bookmarking
- [ ] Social sharing integrations
- [ ] Email notifications
- [ ] OAuth integration (GitHub, Google)
- [ ] Dark/Light theme toggle
- [ ] RSS feed generation

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Benjamin Yankey**

- GitHub: [@Benjamin-yankey](https://github.com/Benjamin-yankey)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Design inspiration from [Dev.to](https://dev.to) and [Hashnode](https://hashnode.com)
- Icons from [Iconify](https://iconify.design)
- Fonts from [Google Fonts](https://fonts.google.com)
- Images from [Unsplash](https://unsplash.com) and [LoremFlickr](https://loremflickr.com)

---

<div align="center">

**Built with ❤️ for developers**

[⬆ Back to Top](#-devlog--where-code-meets-great-writing)

</div>
