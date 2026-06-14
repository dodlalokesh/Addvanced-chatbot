🚀 Omni Solve AI

Omni Solve AI is a premium, client-side interactive chatbot application designed to solve real-world coding, network connectivity, and DIY hardware issues in real time.

Unlike traditional chatbots that provide static responses, Omni Solve AI delivers interactive, step-by-step solutions including diagnostic checklists, copy-ready commands, structured code diffs, and warning guidance.

🎯 Key Features

✅ Interactive troubleshooting workflows

✅ Step-by-step diagnostic checklists

✅ Copy-on-click terminal commands

✅ Structured code diffs (not plain text)

✅ Smart domain detection (Coding / Network / Hardware)

✅ Real-time progress tracking UI


🧠 Project Vision

Transform chatbot responses into actionable, guided problem-solving workflows.

This project focuses on making AI practical, usable, and execution-ready, rather than just conversational.

🏗️ System Architecture
🔷 Architecture Overview
./images/architecture.png

🔶 Architecture Flow

================ USER ACCESS LAYER ================


User → Browser → Domain (omnisolve.local)
       ↓
Local DNS + Port Forwarding
       ↓
Nginx Ingress Controller

       ↓
Kubernetes Services

       ↓
Chatbot Pods (Nginx UI)



================ APPLICATION LAYER ================


React UI (HTML + CSS + JS)

       ↓
Served via Nginx Container

       ↓
Runs inside Kubernetes (Minikube)

       ↓
Deployment (2 Replicas)



================ CI/CD PIPELINE =================


Webhook Trigger

       ↓
Jenkins Pipeline

       ↓
Docker Build

       ↓
Docker Hub Push

       ↓
Kubernetes Deployment



================ MONITORING =================


Prometheus → Collect Metrics

       ↓
Grafana → Visualize Dashboards



⚙️ Technology Stack

🔹 Frontend


HTML5

CSS3 (Glassmorphism UI)

Vanilla JavaScript (ES6+)


🔹 Containerization


Docker

Docker Compose


🔹 Orchestration


Kubernetes

Minikube

Deployment, Services, Ingress


🔹 CI/CD


Jenkins

GitHub Webhooks


🔹 Monitoring


Prometheus

Grafana



🐳 Containerization (Docker)


Uses Nginx Alpine Image

Hosts UI inside:

/usr/share/nginx/html


Exposes:

Port 80



✅ Run Locally
Shelldocker compose up --buildShow more lines

☸️ Kubernetes (Minikube)
🔹 Deployment

Maintains 2 replicas
Ensures high availability

🔹 Resource Limits
YAMLcpu: 200mmemory: 256MiShow more lines
🔹 Health Checks

Liveness Probe ✅
Readiness Probe ✅

🔹 Service

ClusterIP (internal load balancing)


🌐 Ingress & Routing
✅ Domains


















DomainServiceomnisolve.localChatbot Appprometheus.localPrometheusgrafana.localGrafana
✅ Features

Host-based routing
Nginx Ingress Controller
Local DNS (hosts file)
Port forwarding (8081 → 80)


🤖 CI/CD Pipeline (Jenkins)
✅ Pipeline Stages

Checkout code
Validate files
Build Docker image
Push to Docker Hub
Deploy to Kubernetes
Verify rollout

✅ Image
lokeshreddy45/chatbot:latest


📊 Monitoring (Prometheus & Grafana)
🔹 Prometheus


Collects:

CPU usage
Memory usage
Network metrics



Uses:

cAdvisor
Kubernetes API




🔹 Grafana

Visual dashboards for:

Pod health
Resource usage
Performance metrics




🔄 Application Flow (Simple)
User → UI → Kubernetes → Pods
        ↓
    Request handled
        ↓
    Response returned


📸 Screenshots (Add These)
Add screenshots in this section:
Markdown## Screenshots### Jenkins Pipeline![Jenkins](images/jenkins.png)### Docker Hub![Docker](images/docker.png)### Kubernetes Pods![K8s](images/k8s.png)### Prometheus![Prometheus](images/prometheus.png)### Grafana Dashboard![Grafana](images/grafana.png)### Application UI![App](images/app.png)Show less

🎯 Key Highlights

✅ Fully containerized application
✅ Kubernetes orchestration
✅ CI/CD automation
✅ Ingress-based routing
✅ Real-time monitoring
✅ Zero-cost local setup


🚀 How to Run
Shellgit clone <repo-url>cd omnisolve-aidocker compose up --buildShow more lines
Start Minikube:
Shellminikube startkubectl apply -f k8s/``
