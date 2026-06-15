# 🚀 OmniSolve AI – DevOps Project

---

# 🔄 Workflow Summary

## 1️⃣ Application Request Flow
User accesses the application via browser →  
Frontend (HTML, CSS, JS) loads chatbot UI →  
User interacts with troubleshooting system.

---

## 2️⃣ Container Serving
Frontend is served by **Nginx running inside Docker** →  
Static files are hosted from `/usr/share/nginx/html`.

---

## 3️⃣ Kubernetes Deployment
Docker container runs inside **Minikube Kubernetes cluster** →  
Deployment maintains **2 replicas** for high availability.

---

## 4️⃣ Service & Routing
ClusterIP Service exposes pods internally →  
Nginx Ingress Controller routes traffic based on domains:

- omnisolve.local → Chatbot  
- prometheus.local → Prometheus  
- grafana.local → Grafana  

---

## 5️⃣ CI/CD Pipeline Flow
GitHub → Webhook → Jenkins →  
Docker build → Push to Docker Hub →  
Deploy to Kubernetes → Rollout verification  

---

## 6️⃣ Monitoring Flow
Kubernetes Pods → Prometheus collects metrics →  
Grafana visualizes dashboards  

---

# 🚀 How to Run

## Step 1: Clone Repository
```bash
git clone <your-repo-url>
cd omnisolve-ai
