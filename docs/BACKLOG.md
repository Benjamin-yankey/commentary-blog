# Product Backlog

## Definition of Done

A user story is considered "Done" when:

- [ ] Code is written and follows project conventions
- [ ] Unit tests are written and passing (minimum 80% coverage)
- [ ] Code is committed with meaningful commit message
- [ ] CI/CD pipeline passes all checks
- [ ] Feature works in local development environment
- [ ] Acceptance criteria are fully met
- [ ] Code is reviewed (self-review with checklist)
- [ ] Documentation updated (if applicable)

---

## Story 1: User Registration

**Priority:** MUST HAVE  
**Estimate:** 5 points

**As a** new visitor  
**I want to** create an account  
**So that** I can write and publish blog posts

**Acceptance Criteria:**

- [ ] User can access registration form at `/register`
- [ ] Form requires: `username`, `email`, `password`, `confirm password`
- [ ] `Username` must be unique (3-20 characters)
- [ ] `Email` must be valid format and unique
- [ ] `Password` must be at least 8 characters with 1 number
- [ ] Passwords must match
- [ ] Form displays validation errors clearly
- [ ] Password is hashed before storage (bcrypt)
- [ ] Successful registration redirects to login page
- [ ] User data stored in database with `created_at` timestamp

---

## Story 2: User Login

**Priority:** MUST HAVE  
**Estimate:** 3 points

**As a** registered user  
**I want to** log into my account  
**So that** I can access my dashboard and create posts

**Acceptance Criteria:**

- [ ] User can access login form at `/login`
- [ ] Form accepts `email` and `password`
- [ ] System validates credentials against database
- [ ] Invalid credentials show error message ("Invalid email or password")
- [ ] Successful login creates session/JWT token
- [ ] User redirected to dashboard/home after login
- [ ] Login state persists across page refreshes
- [ ] "Remember me" option available

---

## Story 3: Create Blog Post

**Priority:** MUST HAVE  
**Estimate:** 5 points

**As a** logged-in user  
**I want to** create a new blog post  
**So that** I can share my commentary with others

**Acceptance Criteria:**

- [ ] User can access "New Post" button from navbar
- [ ] Form includes: `title`, `content`, optional `tags`
- [ ] `Title` is required (5-200 characters)
- [ ] `Content` is required (minimum 50 characters)
- [ ] User can preview post before publishing (optional)
- [ ] User can publish immediately
- [ ] Published posts are visible to all users
- [ ] Post shows author name and timestamp
- [ ] Success message shown after publishing

---

## Story 4: View All Blog Posts

**Priority:** MUST HAVE  
**Estimate:** 3 points

**As a** visitor (logged in or not)  
**I want to** see a list of all published blog posts  
**So that** I can discover content to read

**Acceptance Criteria:**

- [ ] Homepage displays all published posts
- [ ] Posts show: `title`, `author`, `date`, `excerpt` (first 150 chars)
- [ ] Posts are sorted by newest first
- [ ] Each post is clickable to view full content
- [ ] Show "No posts yet" message if empty
- [ ] Page loads in under 2 seconds
- [ ] Display shows 10 posts per page (Pagination)

---

## Story 5: View Individual Post

**Priority:** MUST HAVE  
**Estimate:** 3 points

**As a** visitor  
**I want to** read a full blog post  
**So that** I can understand the author's commentary

**Acceptance Criteria:**

- [ ] Clicking post opens dedicated page (`/posts/:id`)
- [ ] Page displays: full `title`, `author`, `date`, full `content`
- [ ] Content formatting is preserved (paragraphs, headers, code blocks)
- [ ] "Back to all posts" link available
- [ ] 404 page shown for non-existent posts
- [ ] Author can see "Edit" and "Delete" buttons on their own posts

---

## Story 6: Add Comments to Post

**Priority:** SHOULD HAVE  
**Estimate:** 5 points

**As a** logged-in user  
**I want to** comment on blog posts  
**So that** I can engage in discussion with the author

**Acceptance Criteria:**

- [ ] Comment section appears below blog post
- [ ] Only logged-in users see comment input form
- [ ] Form has textarea for comment text
- [ ] Comment must be non-empty
- [ ] Submit button posts comment and updates list immediately
- [ ] Comments show: `author name`, `timestamp`, `text`
- [ ] Comments are sorted oldest first (or newest first)
- [ ] Success message after posting

---

## Story 7: Delete Blog Post

**Priority:** SHOULD HAVE  
**Estimate:** 2 points

**As a** logged-in author  
**I want to** delete my own blog posts  
**So that** I can remove content I no longer want published

**Acceptance Criteria:**

- [ ] "Delete" button visible ONLY to post author
- [ ] Clicking delete shows confirmation dialog ("Are you sure?")
- [ ] Confirmation required before deletion
- [ ] Post and associated comments are removed from database
- [ ] User redirected to homepage after deletion
- [ ] Success message displayed

---

## Story 8: Edit Blog Post

**Priority:** COULD HAVE  
**Estimate:** 3 points

**As a** logged-in author  
**I want to** edit my published posts  
**So that** I can fix mistakes or update content

**Acceptance Criteria:**

- [ ] "Edit" button visible ONLY to post author
- [ ] Clicking edit opens form pre-populated with existing content
- [ ] User can modify `title`, `content`, `tags`
- [ ] "Update Post" button saves changes
- [ ] Changes visible immediately after saving
- [ ] User can cancel editing without saving

---

## Story 9: User Logout

**Priority:** MUST HAVE  
**Estimate:** 1 point

**As a** logged-in user  
**I want to** log out of my account  
**So that** I can secure my session on shared devices

**Acceptance Criteria:**

- [ ] "Logout" button visible when logged in
- [ ] Clicking logout clears session/token
- [ ] User redirected to homepage/login
- [ ] User cannot access protected routes after logout
