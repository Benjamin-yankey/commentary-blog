# Sprint 2 Plan

**Sprint Duration:** Day 8-12 (5 days)  
**Sprint Goal:** Enable users to create, view, and read blog posts

---

## Selected User Stories

### 1. Create Blog Post (5 points)

Build complete functionality for authenticated users to write and publish posts

### 2. View All Blog Posts (3 points)

Display homepage with list of all published posts

### 3. View Individual Post (3 points)

Show full post content on dedicated page

**Total Story Points:** 11 points

---

## Process Improvements from Sprint 1 Retro

### ✅ Implementation Plan

1. **Frontend Setup Day 1**
   - Install React (or use vanilla JS/HTML)
   - Create component structure
   - Set up routing

2. **Integration Testing**
   - Add Cypress or Playwright for E2E tests
   - Target 85% test coverage
   - Test complete user flows

3. **Request Logging**
   - Install morgan middleware
   - Log all API requests
   - Add response time tracking

4. **Smaller Commits**
   - Aim for 4-5 commits per day
   - Keep commits under 100 lines
   - Use conventional commit format

---

## Day-by-Day Breakdown

### Day 1 (Monday): Project Setup & Frontend Foundation

- [ ] Install React and configure build
- [ ] Create basic component structure (Navbar, Home, PostForm)
- [ ] Set up React Router
- [ ] Install morgan for logging
- [ ] Create posts table schema

**Commits:** 4-5  
**Expected Output:** Basic React app structure with routing

### Day 2 (Tuesday): Create Post - Backend

- [ ] Write tests for POST /api/posts
- [ ] Create Post model
- [ ] Build create post endpoint
- [ ] Add authentication check
- [ ] Test with Postman

**Commits:** 4-5  
**Expected Output:** Working API endpoint for creating posts

### Day 3 (Wednesday): Create Post - Frontend

- [ ] Build post creation form component
- [ ] Add rich text editor (optional: TinyMCE)
- [ ] Connect form to backend API
- [ ] Add form validation
- [ ] Style post form

**Commits:** 4-5  
**Expected Output:** Complete post creation feature (Story 1 DONE)

### Day 4 (Thursday): View Posts

- [ ] Write tests for GET /api/posts
- [ ] Create get all posts endpoint
- [ ] Create get single post endpoint
- [ ] Build posts list component
- [ ] Build single post view component
- [ ] Add pagination

**Commits:** 4-5  
**Expected Output:** Stories 2 & 3 DONE

### Day 5 (Friday): Testing, Monitoring & Review

- [ ] Add integration tests for full flows
- [ ] Add monitoring/health endpoints
- [ ] Check test coverage (target 85%)
- [ ] Fix any bugs
- [ ] Prepare Sprint Review
- [ ] Write Sprint 2 Retrospective

**Commits:** 3-4  
**Expected Output:** All stories completed, documented

---

## Definition of Done (Updated)

Each story must meet:

- [ ] Frontend and backend both completed
- [ ] Unit tests written and passing
- [ ] Integration tests added
- [ ] Test coverage ≥ 85%
- [ ] All commits follow convention (feat:, fix:, test:)
- [ ] CI/CD pipeline passing
- [ ] Feature working end-to-end in browser
- [ ] Request logging added
- [ ] Documentation updated

---

## Technical Stack

**Frontend:**

- React 18
- React Router
- Axios for API calls
- TailwindCSS or Bootstrap

**Backend:**

- Express.js
- PostgreSQL
- JWT authentication
- Morgan logging

**Testing:**

- Jest (unit tests)
- Supertest (API tests)
- React Testing Library (frontend tests)

---

## Success Criteria

- [ ] All 3 stories completed (11 points)
- [ ] Test coverage ≥ 85%
- [ ] 20+ commits with meaningful messages
- [ ] Frontend fully functional
- [ ] Logging implemented
- [ ] Integration tests passing
