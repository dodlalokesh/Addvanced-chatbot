🚀 OmniSolve AI – DevOps Project

OmniSolve AI is a full-stack DevOps project demonstrating modern CI/CD, containerization, orchestration, and observability practices. This project showcases how a chatbot application is built, containerized, deployed to Kubernetes, and monitored using industry-standard tools.

===========================================================

📌 Project Overview

OmniSolve AI is an intelligent troubleshooting chatbot designed to assist developers and users in diagnosing networking, hardware, and software issues through an interactive checklist-based UI.

===========================================================

The project emphasizes:

End-to-end CI/CD automation

Kubernetes(Minikube)-based deployment

Scalable and resilient architecture

Real-time monitoring and observability

==========================================================

🏗️ System Architecture

The workflow includes:

Developer pushes code → GitHub

Jenkins pipeline builds and deploys

Docker image is created and pushed to Docker Hub

Kubernetes (Minikube) deploys containers

Ingress routes traffic to services

Prometheus & Grafana monitor system metrics

==========================================================

🔧 Component Breakdown

1️⃣ Application Layer (Chatbot)


Frontend:

HTML5 + CSS3 (Glassmorphism UI)
Vanilla JavaScript (ES6+)



Core Features:

Interactive troubleshooting checklist
Dynamic progress bar updates
Smart domain switching using keyword detection

============================================

2️⃣ 🐳 Containerization (Docker)
Dockerfile

Uses nginx:alpine (lightweight and secure)
Serves static frontend via /usr/share/nginx/html
Exposes port 80

docker-compose.yml

Enables local development with:
docker compose up --build

Includes:

Container logging limits
Healthchecks using curl

========================================

3️⃣ ☸️ Orchestration (Kubernetes / Minikube)
Deployment (deployment.yaml)

Maintains 2 replicas for high availability

Resouce limits:

limits:
  cpu: 200m
  memory: 256Mi

Health Probes

Liveness Probe: Restarts unhealthy containers

Readiness Probe: Ensures traffic only hits healthy pods

Service (service.yaml)

Type: ClusterIP
Acts as internal load balancer

==========================================

4️⃣ 🌐 Routing & Exposure (Ingress)
Ingress Rules (ingress.yaml)

   | Domain            | Service            | Port |
|------------------|------------------------|------|
| omnisolve.local  | Chatbot Service        | 80   |
| prometheus.local | Prometheus Service     | 9090 |
| grafana.local    | Grafana Service        | 3000 |


Ingress Controller

NGINX Ingress Controller handles routing via Host headers

Additional Setup

Local DNS mapping via hosts file

Port forwarding:

Host:8081 → Minikube Ingress:80

===============================================

5️⃣ ⚙️ CI/CD Pipeline (Jenkins)

Jenkinsfile Stages


Checkout

    Pulls latest code from GitHub


Static Validation

    Ensures required files exist



Build Docker Image

     Builds using project Dockerfile



Push Image

     Pushes to Docker Hub:
           lokeshreddy45/chatbot:latest
