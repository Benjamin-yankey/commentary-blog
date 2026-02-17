pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'commentary-blog'
        DB_HOST = 'localhost'
        DB_PORT = '5432'
        DB_NAME = 'commentary_blog_test'
        DB_USER = 'postgres'
        DB_PASSWORD = 'postgres'
        JWT_SECRET = 'test-secret-key'
    }

    stages {
        stage('Initialize') {
            steps {
                echo 'Checking environment...'
                sh 'node -v'
                sh 'npm -v'
                sh 'docker -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing root dependencies...'
                sh 'npm ci'
                echo 'Installing client dependencies...'
                sh 'cd client && npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo 'Running linting...'
                sh 'npx eslint src/ --max-warnings=0 || true'
            }
        }

        stage('Database Setup') {
            steps {
                echo 'Starting Postgres container...'
                sh 'docker-compose -f docker-compose.test.yml up -d'
                // Wait for DB to be ready
                sh 'sleep 5'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm run test:ci'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building production Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Generating production build of frontend...'
                sh 'cd client && npm run build'
            }
        }
    }

    post {
        always {
            echo 'Archiving artifacts...'
            junit 'junit.xml'
            archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
            echo 'Stopping containers...'
            sh 'docker-compose -f docker-compose.test.yml down'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check Jenkins logs for details.'
        }
    }
}
