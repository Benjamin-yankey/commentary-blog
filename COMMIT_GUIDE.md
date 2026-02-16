# Post Feature Implementation - Commit Guide

This guide shows all the changes made and the commit commands to use.

## Backend Implementation

### Commit 1: Create posts table schema
**Files changed:** `src/config/schema.sql`
```bash
git add src/config/schema.sql
git commit -m "feat: create posts table schema"
```

### Commit 2: Add create post endpoint tests
**Files changed:** `tests/posts.test.js` (new file)
```bash
git add tests/posts.test.js
git commit -m "test: add create post endpoint tests"
```

### Commit 3: Add JWT authentication middleware
**Files changed:** `src/middleware/authMiddleware.js` (new file)
```bash
git add src/middleware/authMiddleware.js
git commit -m "feat: add JWT authentication middleware"
```

### Commit 4: Add post controller
**Files changed:** `src/controllers/postController.js` (new file)
```bash
git add src/controllers/postController.js
git commit -m "feat: add post controller with create functionality"
```

### Commit 5: Add POST /api/posts endpoint
**Files changed:** `src/routes/postRoutes.js` (new file), `src/app.js`
```bash
git add src/routes/postRoutes.js src/app.js
git commit -m "feat: add POST /api/posts endpoint"
```

### Commit 6: Add GET endpoints
**Files changed:** `src/controllers/postController.js`, `src/routes/postRoutes.js`
```bash
git add src/controllers/postController.js src/routes/postRoutes.js
git commit -m "feat: add GET /api/posts endpoints with pagination"
```

### Commit 7: Add tests for GET endpoints
**Files changed:** `tests/posts.test.js`
```bash
git add tests/posts.test.js
git commit -m "test: add tests for GET posts endpoints"
```

## Frontend Implementation

### Commit 8: Build post creation form
**Files changed:** `client/src/components/PostForm.js` (new file)
```bash
git add client/src/components/PostForm.js
git commit -m "feat: build post creation form component"
```

### Commit 9: Add styling to post form
**Files changed:** `client/src/components/PostForm.css` (new file)
```bash
git add client/src/components/PostForm.css
git commit -m "style: add styling to post form"
```

### Commit 10: Create posts list component
**Files changed:** `client/src/components/PostList.js`, `client/src/components/PostList.css` (new files)
```bash
git add client/src/components/PostList.js client/src/components/PostList.css
git commit -m "feat: create posts list component with pagination"
```

### Commit 11: Implement single post view
**Files changed:** `client/src/components/PostDetail.js`, `client/src/components/PostDetail.css` (new files)
```bash
git add client/src/components/PostDetail.js client/src/components/PostDetail.css
git commit -m "feat: implement single post view"
```

### Commit 12: Connect frontend with routing
**Files changed:** `client/src/App.js`, `client/src/App.css`
```bash
git add client/src/App.js client/src/App.css
git commit -m "feat: connect frontend with routing and navigation"
```

## Quick Commit All Changes

If you want to commit all changes at once (not recommended for learning, but faster):

```bash
# Stage all changes
git add .

# Commit with a comprehensive message
git commit -m "feat: implement complete post creation and viewing feature

- Add posts table schema
- Create POST /api/posts endpoint with authentication
- Create GET /api/posts and GET /api/posts/:id endpoints
- Add pagination support
- Build PostForm, PostList, and PostDetail components
- Add routing and navigation
- Include comprehensive tests"
```

## Testing Your Changes

Before committing, make sure to test:

```bash
# Backend tests
npm test

# Start backend server
npm run dev

# In another terminal, start frontend
cd client
npm start
```

## Next Steps

After committing, you can:
1. Push to GitHub: `git push origin main`
2. Create a pull request
3. Add more features (comments, likes, etc.)
4. Improve styling
5. Add authentication UI (login/register forms)
