# Jenkins Integration Guide

This project is now configured for Jenkins CI/CD.

## Files Added
- `Jenkinsfile`: Defines the automated pipeline.
- `docker-compose.test.yml`: Manages the test database (Postgres) during the CI process.
- `Dockerfile`: Multi-stage build for production-ready containerization.

## Prerequisites for Jenkins Server
To run this pipeline, your Jenkins server/node needs:
1. **Docker**: Installed and the Jenkins user added to the `docker` group.
2. **Docker Compose**: Installed.
3. **Node.js**: Installed (version 18 or 20 recommended).

## Setup Instructions

### 1. Create a New Pipeline Job
- Open Jenkins and click **New Item**.
- Enter a name (e.g., `commentary-blog`) and select **Pipeline**.
- Click **OK**.

### 2. Configure the Pipeline
- Scroll down to the **Pipeline** section.
- Set **Definition** to **Pipeline script from SCM**.
- Set **SCM** to **Git**.
- Enter your Repository URL.
- Ensure the **Script Path** is set to `Jenkinsfile`.

### 3. Environment Variables
The pipeline uses several environment variables defined in the `Jenkinsfile`. If you need to override them (like database credentials for a specific environment), you can add them in the Jenkins job configuration or via a `.env` file that Jenkins can read.

## Pipeline Stages
1. **Initialize**: Verifies that Node.js and Docker are available.
2. **Install Dependencies**: Runs `npm ci` for backend and frontend.
3. **Lint**: Checks code quality.
4. **Database Setup**: Spins up a Postgres container for isolated testing.
5. **Test**: Runs the full test suite with coverage.
6. **Docker Build**: Creates a production Docker image tagged with the build number.
7. **Build Frontend**: Generates the static production build of the React app.

## Artifacts
After a successful build, the **Code Coverage** reports will be archived and accessible directly from the Jenkins build page.
