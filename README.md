# Commentary Blog - Agile & DevOps Assessment

A full-stack blogging platform demonstrating Agile methodology and DevOps best practices.

## 🎯 Product Vision

For writers and readers who want to engage in meaningful discussions, Commentary Blog is a simple blogging platform that enables users to publish posts and engage through comments. Unlike complex platforms like Medium, our product focuses on simplicity and conversation.

## ✨ Features Delivered

### Sprint 1: Authentication System

- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes and middleware

### Sprint 2: Blog Functionality

- ✅ Create blog posts with rich text
- ✅ View all posts on homepage
- ✅ Individual post pages
- ✅ Edit/delete for post authors
- ✅ Pagination

## 🛠 Tech Stack

**Frontend:**

- React 18
- React Router
- Axios
- TailwindCSS

**Backend:**

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication

**Testing & CI/CD:**

- Jest (Unit Tests)
- Supertest (API Tests)
- React Testing Library
- GitHub Actions

## 📊 Project Metrics

| Metric                   | Value        |
| ------------------------ | ------------ |
| Story Points Delivered   | 20/20 (100%) |
| Test Coverage            | 87%          |
| Total Tests              | 45           |
| Commits                  | 42           |
| CI Pipeline Success Rate | 93%          |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/yourusername/commentary-blog.git
   cd commentary-blog
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   cd client && npm install && cd ..
   \`\`\`

3. Set up environment variables
   \`\`\`bash
   cp .env.example .env

# Edit .env with your database credentials

\`\`\`

4. Set up database
   \`\`\`bash
   createdb commentary_blog
   psql commentary_blog < src/config/schema.sql
   \`\`\`

5. Run the application
   \`\`\`bash

# Terminal 1: Backend

npm run dev

# Terminal 2: Frontend

cd client && npm start
\`\`\`

6. Run tests
   \`\`\`bash
   npm test
   \`\`\`

## 📁 Documentation

All project documentation is in the `/docs` folder:

- [Product Vision](docs/PRODUCT_VISION.md)
- [Product Backlog](docs/BACKLOG.md)
- [Sprint 1 Plan](docs/SPRINT_1_PLAN.md)
- [Sprint 1 Review](docs/SPRINT_1_REVIEW.md)
- [Sprint 1 Retrospective](docs/SPRINT_1_RETRO.md)
- [Sprint 2 Plan](docs/SPRINT_2_PLAN.md)
- [Sprint 2 Review](docs/SPRINT_2_REVIEW.md)
- [Final Retrospective](docs/FINAL_RETROSPECTIVE.md)

## 🧪 Testing

### Run all tests

\`\`\`bash
npm test
\`\`\`

### Run with coverage

\`\`\`bash
npm test -- --coverage
\`\`\`

### Current Coverage: 87%

- Unit Tests: 37
- Integration Tests: 8

## 🔄 CI/CD Pipeline

Automated pipeline runs on every push:

- ✅ Linting (ESLint)
- ✅ Unit Tests
- ✅ Integration Tests
- ✅ Coverage Reports
- ✅ Build Verification

View pipeline: [GitHub Actions](.github/workflows/ci.yml)

## 📸 Screenshots

See [/evidence](evidence/) folder for:

- Application screenshots
- Test results
- Pipeline runs
- Coverage reports

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ Agile sprint planning and execution
- ✅ User story creation with acceptance criteria
- ✅ Test-Driven Development (TDD)
- ✅ CI/CD pipeline implementation
- ✅ Incremental, iterative development
- ✅ Sprint reviews and retrospectives
- ✅ DevOps best practices

## 📝 License

MIT License - See LICENSE file for details

## 👤 Author

[Your Name]

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

**Assessment Submission:** [Date]  
**Total Duration:** 12 days (Sprint 0 + Sprint 1 + Sprint 2)
