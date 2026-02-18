# Sprint 2 Plan: Core Features & Feedback Implementation

**Sprint Duration:** Day 8-12 (5 days)  
**Sprint Goal:** Transform the MVP into a functional blogging platform by enabling post creation, viewing, and community interaction, while applying process improvements from Sprint 1.

---

## 🎯 Selected User Stories

### 1. Create Blog Post (Backlog Item #3)
**Estimate:** 5 Story Points  
**Description:** Build complete functionality for authenticated users to write and publish posts.  
**Dependencies:** User Authentication (Completed in Sprint 1)  
**Acceptance Criteria:**
- [ ] User can access "New Post" page
- [ ] Form captures Title, Content, and optional Image URL
- [ ] Validation prevents empty titles or short content (<50 chars)
- [ ] Successful submission redirects to the new post
- [ ] Error messages display for invalid inputs

### 2. View All Blog Posts (Backlog Item #4)
**Estimate:** 3 Story Points  
**Description:** Display a responsive homepage listing all published posts to drive discovery.  
**Acceptance Criteria:**
- [ ] Homepage fetches latest posts from API
- [ ] Display card includes Title, Author, Date, and Excerpt
- [ ] "Read More" button links to full post
- [ ] Loading state (spinner) shown while fetching
- [ ] Empty state shown if no posts exist

### 3. View Individual Post (Backlog Item #5)
**Estimate:** 3 Story Points  
**Description:** Show full post content on a dedicated page to verify data integrity and display.  
**Acceptance Criteria:**
- [ ] URL `/posts/:id` loads specific post data
- [ ] Title, Author, Date, and Full Content are visible
- [ ] 404 Page displayed if ID does not exist
- [ ] Markdown/Text formatting is preserved

### 4. Add Comments (Backlog Item #6)
**Estimate:** 5 Story Points  
**Description:** Enable community engagement through a comment section.  
**Acceptance Criteria:**
- [ ] Comment input visible only to logged-in users
- [ ] Comment list visible to all users
- [ ] New comments appear immediately (optimistic UI or re-fetch)
- [ ] Authors can delete their own comments

---

## 🔄 Process Improvements (From Sprint 1 Retro)

| Improvement | Action Items | Success Metric |
| :--- | :--- | :--- |
| **Start Frontend Early** | Setup React on Day 1. Don't wait for backend completion. | Feature demo-able by Day 4 |
| **Integration Testing** | Add supertest for API endpoints. | > 85% Coverage |
| **Better Logging** | Install `morgan` middleware. | Logs visible in CI/CD output |
| **Small Commits** | Commit every ~2 hours of work. | > 15 commits total |

---

## 📅 Day-by-Day Execution Plan

### Day 1: Foundation & Frontend Setup
- [ ] **Tech:** Initialize React Client (CRA/Vite).
- [ ] **Tech:** configure `concurrently` to run client/server together.
- [ ] **Tech:** Install `morgan` for backend logging.
- [ ] **UI:** Build `Navbar` and `Layout` components.
- [ ] **DB:** Create `posts` and `comments` tables migration.
- [ ] **Docs:** Update API documentation.

### Day 2: Post Creation (Full Stack)
- [ ] **Backend:** Implement `POST /api/posts` with validation.
- [ ] **Backend:** Test endpoint with Jest/Supertest.
- [ ] **Frontend:** Build `CreatePost` form with state management.
- [ ] **Integration:** Connect Form to API and handle errors.

### Day 3: Reading Experience
- [ ] **Backend:** Implement `GET /api/posts` and `GET /api/posts/:id`.
- [ ] **Frontend:** Create `PostList` component (Homepage).
- [ ] **Frontend:** Create `PostDetail` page.
- [ ] **Style:** Apply CSS/Tailwind for responsive design.

### Day 4: Comments & Refinement
- [ ] **Backend:** Implement Comments API (CRUD).
- [ ] **Frontend:** Build `CommentSection` component.
- [ ] **Security:** Ensure only authors can delete their content.
- [ ] **Verify:** Run full test suite.

### Day 5: Final Polish & Review
- [ ] **QA:** Manual walkthrough of all user stories.
- [ ] **DevOps:** Verify Jenkins/GitHub Actions pipeline passes.
- [ ] **Docs:** Screenshot evidence for submission.
- [ ] **Retro:** Conduct Sprint 2 Retrospective.

---

## 📋 Definition of Done (DoD)

A User Story is Done when:
1.  **Code:** Compiles, runs, and is committed to `main`.
2.  **Tests:** Unit tests passed + Integration tests passed.
3.  **review:** Self-reviewed against Acceptance Criteria.
4.  **CI/CD:** Pipeline green (Build + Test + Lint).
5.  **Audit:** No severity 1 security vulnerabilities.

---

## 🛠 Resource Plan

- **Developer:** 1 (Full Stack)
- **Tools:** VS Code, Docker, Postman
- **Risk Management:**
    - *Risk:* Frontend complexity. *Mitigation:* specific UI library (Tailwind) to speed up styling.
    - *Risk:* Database schema changes. *Mitigation:* Use simple SQL scripts instead of complex ORM migrations for MVP.

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
