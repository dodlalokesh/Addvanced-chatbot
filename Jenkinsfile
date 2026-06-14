pipeline {
    agent any

    environment {
        APP_NAME        = 'omnisolve-chatbot'
        IMAGE_NAME      = 'omnisolve-chatbot'
        IMAGE_TAG       = 'latest'
        K8S_DIR         = 'k8s'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source repository...'
                checkout scm
            }
        }

        stage('Static Verification') {
            steps {
                echo 'Verifying application source assets...'
                // Verify core frontend files exist
                sh 'test -f index.html && test -f style.css && test -f app.js'
                echo 'Source assets check passed successfully.'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building production Docker image inside Minikube context...'
                /*
                 * In a Minikube environment, you can point your local Docker client
                 * to Minikube's built-in Docker daemon. This avoids the need to push
                 * images to an external registry like Docker Hub during local dev pipelines.
                 */
                sh '''
                    if command -v minikube &> /dev/null; then
                        eval $(minikube -p minikube docker-env)
                    fi
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Deploy to Minikube') {
            steps {
                echo 'Deploying application manifests to local cluster...'
                sh '''
                    kubectl apply -f ${K8S_DIR}/deployment.yaml
                    kubectl apply -f ${K8S_DIR}/service.yaml
                    kubectl apply -f ${K8S_DIR}/ingress.yaml
                '''
            }
        }

        stage('Deploy Observability Stack') {
            steps {
                echo 'Deploying Prometheus and Grafana monitoring stacks...'
                sh '''
                    kubectl apply -f ${K8S_DIR}/prometheus.yaml
                    kubectl apply -f ${K8S_DIR}/grafana.yaml
                '''
            }
        }

        stage('Service Health Checks') {
            steps {
                echo 'Performing rollout safety verifications...'
                sh '''
                    kubectl rollout status deployment/omnisolve-deployment --timeout=120s
                    kubectl rollout status deployment/prometheus-deployment --timeout=120s
                    kubectl rollout status deployment/grafana-deployment --timeout=120s
                '''
                echo 'All resources successfully deployed and operational.'
            }
        }
    }

    post {
        success {
            echo 'DevOps CI/CD Build & Deployment completed successfully! 🎉'
        }
        failure {
            echo 'Build or deployment failed. Please review console output and logs. ❌'
        }
    }
}
