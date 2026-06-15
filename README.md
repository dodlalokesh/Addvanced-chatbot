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
