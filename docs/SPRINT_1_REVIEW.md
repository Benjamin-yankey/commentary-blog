# Sprint 1 Review

**Date:** [Your date]  
**Sprint Goal:** Implement user authentication system  
**Duration:** 5 days

---

## Stories Completed ✅

### 1. User Registration (5 points) - DONE

- ✅ Registration form with validation
- ✅ Password hashing with bcrypt
- ✅ Email and username uniqueness checks
- ✅ Server-side validation
- ✅ 8 unit tests (all passing)

### 2. User Login (3 points) - DONE

- ✅ Login endpoint with JWT
- ✅ Token expiration (24 hours)
- ✅ Authentication middleware
- ✅ Protected route example
- ✅ 6 unit tests (all passing)

### 3. User Logout (1 point) - DONE

- ✅ Logout endpoint
- ✅ Token clearing on client
- ✅ 2 unit tests (all passing)

**Total Completed:** 9/9 story points (100%)

---

## Demo/Evidence

### Screenshots

![Registration Success](../evidence/sprint1-registration.png)
![Login Flow](../evidence/sprint1-login.png)
![CI Pipeline Passing](../evidence/sprint1-pipeline-pass.png)

### API Endpoints Delivered

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /health` - Health check

---

## Metrics

| Metric                 | Target     | Actual                   |
| ---------------------- | ---------- | ------------------------ |
| Story Points Completed | 9          | 9 ✅                     |
| Test Coverage          | 70%        | 82% ✅                   |
| Unit Tests Written     | 12+        | 16 ✅                    |
| Commits Made           | 15+        | 18 ✅                    |
| Pipeline Runs          | -          | 23 (21 passed, 2 failed) |
| Average Commit Size    | <200 lines | 85 lines ✅              |

---

## What Went Well 🎉

1. **TDD Approach:** Writing tests first caught validation bugs early
2. **CI/CD Setup:** Pipeline caught a password hashing bug before merge
3. **Clear Acceptance Criteria:** Made it easy to know when stories were done
4. **Incremental Commits:** 18 commits made debugging much easier

---

## Challenges Encountered 😓

1. **Database Connection:** Took 2 hours to debug PostgreSQL connection in CI
2. **JWT Configuration:** Initial token expiration was too short (fixed to 24h)
3. **Test Environment:** Had to create separate test database to avoid conflicts

---

## Improvements for Next Sprint 🚀

1. **Better Time Estimation:** Registration took longer than expected (6 hours vs 4)
2. **Earlier CI Setup:** Should have set up pipeline in Sprint 0
3. **Frontend Not Started:** Focused only on backend, need UI next sprint

---

## Technical Debt Identified

- [ ] Add password strength meter
- [ ] Implement refresh tokens
- [ ] Add email verification
- [ ] Create API documentation with Swagger

---

## Next Sprint Preview

Sprint 2 will focus on blog post creation and viewing:

- Create Blog Post
- View All Posts
- View Individual Post
