# Evidence Generation Guide

To fulfill the project submission requirements, you must populate the `evidence/` folder with the following screenshots. This is crucial for proving your DevOps and Testing practices.

## 1. CI/CD Evidence (`evidence/ci-cd/`)
*Create a subfolder `ci-cd` inside `evidence` and save these screenshots:*

1.  **pipeline-success.png**: A screenshot of the GitHub Actions "Actions" tab showing a green/successful workflow run for a recent commit.
2.  **pipeline-logs.png**: Click into a successful run and screenshot the logs showing the "Test" or "Build" steps completing successfully.
3.  **pipeline-failure.png**: (If applicable) A screenshot of a failed run, demonstrating that the pipeline correctly catches errors (e.g., failed tests).

## 2. Testing Evidence (`evidence/testing/`)
*Create a subfolder `testing` inside `evidence` and save these screenshots:*

1.  **test-coverage.png**: Run `npm test` or `npm run test:ci` in your terminal and screenshot the final coverage report table showing > 80% coverage.
2.  **unit-tests.png**: A screenshot of the terminal showing the list of passing test suites (e.g., `PASS src/tests/auth.test.js`).

## 3. Application Demo (`evidence/demo/`)
*Create a subfolder `demo` inside `evidence` and save these screenshots:*

1.  **sprint1-registration.png**: The registration page with the form filled out.
2.  **sprint1-login.png**: The login page.
3.  **sprint2-homepage.png**: The homepage showing a list of blog posts.
4.  **sprint2-create-post.png**: The "Create Post" page.
5.  **sprint2-single-post.png**: A view of a single blog post.
6.  **sprint3-comments.png**: The new comments section below a post.
7.  **sprint3-delete-dialog.png**: The confirmation dialog when clicking "Delete" on a post.

---

## How to take screenshots (Mac)
- **Full screen:** Cmd + Shift + 3
- **Selected area:** Cmd + Shift + 4

Once you have taken these screenshots, move them into the corresponding folders in `evidence/`.
