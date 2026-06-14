pipeline {
    agent any

    environment {
        IMAGE_NAME = "lokeshreddy45/chatbot"
        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/dodlalokesh/Addvanced-chatbot.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:latest .
                '''
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy To Kubernetes') {
            steps {
                sh '''
                export KUBECONFIG=/var/lib/jenkins/.kube/config

                # 1. Deploy Chatbot App
                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml
                
                # 2. Deploy Ingress Routing (Notice lowercase ingress.yaml)
                kubectl apply -f k8s/ingress.yaml

                # 3. Deploy Observability Stack (Prometheus & Grafana)
                kubectl apply -f k8s/prometheus.yaml
                kubectl apply -f k8s/grafana.yaml

                # 4. Restart Deployments to load any changes (using actual resource names)
                kubectl rollout restart deployment omnisolve-deployment
                kubectl rollout restart deployment prometheus-deployment
                kubectl rollout restart deployment grafana-deployment
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                export KUBECONFIG=/var/lib/jenkins/.kube/config

                echo "===== Deployments ====="
                kubectl get deployments

                echo "===== Pods ====="
                kubectl get pods -o wide

                echo "===== Services ====="
                kubectl get svc

                echo "===== Ingress ====="
                kubectl get ingress
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }
        failure {
            echo 'Deployment Failed'
        }
    }
}
