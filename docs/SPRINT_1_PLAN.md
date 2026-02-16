# Sprint 1 Plan

**Sprint Duration:** Day 3-7 (5 days)  
**Sprint Goal:** Implement user authentication system to enable user registration, login, and secure sessions

---

## Selected User Stories

### 1. User Registration (5 points)

- Set up database schema for users table
- Create registration API endpoint
- Build registration form UI
- Implement password hashing with bcrypt
- Add client-side and server-side validation
- Write unit tests for registration logic

### 2. User Login (3 points)

- Create login API endpoint
- Implement JWT token generation
- Build login form UI
- Add authentication middleware
- Write unit tests for login logic

### 3. User Logout (1 point)

- Create logout endpoint
- Clear token on client side
- Add logout button to UI
- Write unit tests

**Total Story Points:** 9 points

---

## Technical Tasks Breakdown

### Day 1: Project Setup & Database

- [ ] Initialize Node.js project (Express.js)
- [ ] Set up PostgreSQL/MySQL database
- [ ] Create users table schema
- [ ] Install dependencies (express, bcrypt, jsonwebtoken, etc.)
- [ ] Set up environment variables (.env)
- [ ] Create basic server file

### Day 2: User Registration Backend

- [ ] Create user model
- [ ] Build registration validation logic
- [ ] Implement password hashing
- [ ] Create POST /api/auth/register endpoint
- [ ] Write unit tests for registration
- [ ] Test endpoint with Postman/Insomnia

### Day 3: User Registration Frontend

- [ ] Set up React/HTML frontend structure
- [ ] Create registration form component
- [ ] Add form validation (client-side)
- [ ] Connect form to backend API
- [ ] Handle success/error responses
- [ ] Style registration page

### Day 4: User Login

- [ ] Create POST /api/auth/login endpoint
- [ ] Implement JWT token generation
- [ ] Create authentication middleware
- [ ] Build login form UI
- [ ] Write login tests
- [ ] Test complete login flow

### Day 5: CI/CD Setup & Logout

- [ ] Set up GitHub Actions workflow
- [ ] Configure automated testing
- [ ] Implement logout functionality
- [ ] Add logout button to navbar
- [ ] Final testing and bug fixes
- [ ] Sprint review preparation

---

## Definition of Done Checklist

Each story must meet these criteria:

- [ ] All acceptance criteria met
- [ ] Unit tests written and passing
- [ ] Code committed with clear messages
- [ ] CI/CD pipeline passing
- [ ] Feature tested in browser
- [ ] No console errors

---

## CI/CD Pipeline Requirements

- [ ] Run tests on every push
- [ ] Check code linting
- [ ] Verify build succeeds
- [ ] Test coverage > 70%

---

## Success Metrics

- All 3 stories completed
- 15+ commits with meaningful messages
- Test coverage ≥ 70%
- CI/CD pipeline functional
