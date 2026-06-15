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

<pre>
┌─────────────────────┐
│        USER         │
└──────────┬──────────┘

           │ Ask Question / Problem
           
           ▼
┌────────────────────────────────────┐
│     Frontend (HTML + CSS + JS)     │
│  Dark UI + Chat Interface          │
└──────────┬─────────────────────────┘
           │ Capture User Input
           ▼
┌────────────────────────────────────┐
│   Input Handler (JavaScript)       │
│  Event Listener + Text Processing  │
└──────────┬─────────────────────────┘
           │
           │ Keyword Detection
           ▼
┌────────────────────────────────────┐
│     Smart Routing Engine           │
│  (Network / Hardware / Dev Issues) │
└──────────┬─────────────────────────┘
           │
           │ Map to Category
           ▼
┌────────────────────────────────────┐
│  Diagnostic Troubleshooting Tree   │
│  (Rule-Based Decision Engine)      │
└──────────┬─────────────────────────┘
           │
           │ Generate Steps List
           ▼
┌────────────────────────────────────┐
│     Checklist Generator            │
│  Converts Steps → Interactive UI   │
└──────────┬─────────────────────────┘
           │
           │ User Checks Steps ✔
           ▼
┌────────────────────────────────────┐
│   Progress Tracking Engine         │
│  Completed / Total → Progress %    │
└──────────┬─────────────────────────┘
           │
           │ Update UI in Real-Time
           ▼
┌────────────────────────────────────┐
│     UI Renderer (DOM Updates)      │
│  Progress Bar + Checklist Update   │
└──────────┬─────────────────────────┘
           │
           ▼
┌────────────────────────────────────┐
│  User Gets Actionable Solution     │
│  (Interactive Checklist + Progress)│
└────────────────────────────────────┘
</pre>

============================================================

<pre>
┌─────────────────────┐
│      DEVELOPER      │
└──────────┬──────────┘
           │ Push Code
           ▼
┌─────────────────────┐
│   Git Repository    │
│   (GitHub / GitLab) │
└──────────┬──────────┘
           │ Webhook Trigger
           ▼
┌────────────────────────────┐
│       CI/CD PIPELINE       │
│  (Jenkins / GitHub Actions)│
└──────────┬─────────────────┘
           │
           │ Build Application
           │ Run Tests
           │ Security Scan (Trivy)
           ▼
┌─────────────────────┐
│   Docker Build      │
│   Create Image      │
└──────────┬──────────┘
           │
           │ Push Image
           ▼
┌────────────────────────────┐
│   Container Registry      │
│   (Docker Hub / AWS ECR)  │
└──────────┬─────────────────┘
           │
           │ Deploy (kubectl / Helm)
           ▼
┌────────────────────────────┐
│   Kubernetes Cluster       │
│   (EKS / AKS / GKE)        │
└──────────┬─────────────────┘
           │
           │ Create Deployment
           ▼
┌────────────────────────────┐
│     Application Pods       │
│   (Nginx / Backend App)    │
└──────────┬─────────────────┘
           │
           │ Expose Service
           ▼
┌────────────────────────────┐
│     Kubernetes Service     │
│      (ClusterIP / LB)      │
└──────────┬─────────────────┘
           │
           │ Route Traffic
           ▼
┌────────────────────────────┐
│    Ingress Controller      │
│   (NGINX / ALB Ingress)    │
└──────────┬─────────────────┘
           │
           │ HTTPS / Domain
           ▼
┌─────────────────────┐
│        USERS        │
│   (Web Browser)     │
└─────────────────────┘

</pre>

================ MONITORING STACK =================

<pre>
┌────────────────────────────┐
│        Prometheus          │
│   Metrics Collection       │
└──────────┬─────────────────┘
           │ Scrape Metrics
           ▼
┌────────────────────────────┐
│  Kubernetes Nodes & Pods   │
│ (cAdvisor / kube-state)    │
└──────────┬─────────────────┘
           │
           │ Metrics Query
           ▼
┌────────────────────────────┐
│         Grafana            │
│   Dashboard Visualization  │
└──────────┬─────────────────┘

</pre>
============================================================

⚙️ Deployment Layer (Where It Runs)

<pre>
   Frontend Files (HTML, CSS, JS)
           ▼
┌────────────────────────────┐
│      Nginx (Container)     │
│   Serves Static Files      │
└──────────┬─────────────────┘
           ▼
┌────────────────────────────┐
│   Kubernetes (Minikube)    │
│  Pods + ReplicaSet (x2)    │
└──────────┬─────────────────┘
           ▼
┌────────────────────────────┐
│   ClusterIP Service        │
│  Internal Load Balancer    │
└──────────┬─────────────────┘
           ▼
┌────────────────────────────┐
│   NGINX Ingress Controller │
│  Domain-Based Routing      │
└──────────┬─────────────────┘
           ▼
┌────────────────────────────┐
│        End User Access     │
│   omnisolve.local:8081     │
└────────────────────────────┘

</pre>
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


  Ingress Controller : 

NGINX Ingress Controller handles routing via Host headers

   Additional Setup: 

Local DNS mapping via hosts file

Port forwarding:

Host:8081 → Minikube Ingress:80

===============================================

5️⃣ ⚙️ CI/CD Pipeline (Jenkins)

Jenkinsfile Stages


Checkout :

Pulls latest code from GitHub


Static Validation :

Ensures required files exist



Build Docker Image :

Builds using project Dockerfile



Push Image :

Pushes to Docker Hub:
           
           lokeshreddy45/chatbot:latest

Deploy to Kubernetes :

            kubectl apply -f k8s/

Rollout Verification :

            kubectl rollout status deployment/chatbot

==============================================

6️⃣ 📊 Observability (Prometheus & Grafana)

Prometheus

  Scrapes:

CPU usage

Memory utilization

Network metrics


  Uses RBAC:

ServiceAccount

ClusterRole

ClusterRoleBinding



  Grafana

Connects to Prometheus:

            http://prometheus-service:9090

  Dashboards include:

Pod health

CPU & Memory usage

Network traffic metrics

=========================================

🚀 How to Run Locally

✅ Prerequisites

Docker

Minikube

kubectl

Jenkins

🔹 Step 1: Start Minikube

         minikube start

🔹 Step 2: Enable Ingress

         minikube addons enable ingress

🔹 Step 3: Deploy Kubernetes Resources

         kubectl apply -f k8s/

🔹Step 4: Configure Hosts File

add:

         <EC2_PUBLIC_IP> omnisolve.local
         <EC2_PUBLIC_IP> prometheus.local
         <EC2_PUBLIC_IP> grafana.local

🔹Step 5: Access Application

         Chatbot → http://omnisolve.local:8081
         
         Prometheus → http://prometheus.local:8081
         
         Grafana → http://grafana.local:8081

📦 Docker Image

Available on Docker Hub: 

         lokeshreddy45/chatbot:latest

===============================================

🎯 Key Highlights

✅ Fully automated CI/CD pipeline

✅ Kubernetes-based scalable deployment

✅ Ingress-based routing with custom domains

✅ Real-time monitoring using Prometheus & Grafana

✅ Lightweight and efficient container setup


