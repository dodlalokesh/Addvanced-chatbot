# OmniSolve AI - Real-Time Diagnostics Chatbot

OmniSolve AI is a premium, client-side interactive chatbot application designed to solve real-world coding, network connectivity, and DIY hardware issues in real-time.

Instead of simple static text replies, it returns interactive step-by-step diagnostic checklists, copy-on-click console commands, structural code diffs, and warning boxes.

DevOps Project Explanation: OmniSolve AI
---
This document serves as a complete presentation and review guide for the OmniSolve AI DevOps project. It explains the system architecture, component integrations, automation workflows, and monitoring implementations.

System Architecture
---
Below is the visual flow showing how the developer's code changes move through Jenkins into Minikube, and how end-users and monitoring systems access the running application:

<img width="439" height="425" alt="Screenshot 2026-06-14 151603" src="https://github.com/user-attachments/assets/5bbc736a-d410-4ccf-b902-c71d22d2f869" />

---
## Application Layer (The Chatbot)
Frontend: Built using clean, responsive HTML5, modern CSS3 variables (featuring a dark glassmorphic UI), and Vanilla ES6+ JavaScript.
Logic: Implements a diagnostic troubleshooting tree that maps specific developer/networking/hardware problems into interactive checklists. Checking off steps updates a visual progress bar.
Smart Routing: Key-phrase detection switches chatbot domains dynamically if a user asks a question belonging to another category.

Containerization (Docker)
---
Docker file
: Uses a secure, optimized Nginx Alpine base image. It copies the client-side code directly into Nginx's hosting directory (/usr/share/nginx/html) and exposes port 80.
docker-compose.yml
: Created to enable single-command runs (docker compose up --build) during local developer sandbox runs. Includes Nginx container logging limitations and HTTP curl-based healthchecks.

Orchestration (Minikube / Kubernetes)
---
Pods & ReplicaSet: Managed by a Kubernetes Deployment (deployment.yaml). It maintains 2 replicas of the chatbot for high availability.
Resource Quotas: Limits are set (limits: cpu: 200m, memory: 256Mi) to protect the node from CPU/RAM spikes and enable Prometheus monitoring.
Health Probes: Configures livenessProbe and readinessProbe to ping the Nginx index path / on port 80. If Nginx freezes, Kubernetes automatically restarts the pod.
Service: Configures a ClusterIP service (service.yaml). It acts as an internal load balancer, creating a single internal IP that points to the chatbot pods.

Routing & Exposing (Ingress & Controller)
---
Ingress Resource: Configures host-based routing (ingress.yaml) to direct traffic to the cluster:
omnisolve.local ➔ Chatbot Service (port 80)
prometheus.local ➔ Prometheus Service (port 9090)
grafana.local ➔ Grafana Service (port 3000)
Ingress Controller: An Nginx Ingress Controller addon runs inside the cluster to intercept incoming requests and parse the Host HTTP headers to determine where to route the traffic.
Local DNS Resolver: Mappings in the Windows hosts file resolve the custom domains to the AWS EC2 Public IP.
Port Forwarding: Maps port 8081 on the host to port 80 of the Ingress Controller inside Minikube, allowing external access to the Ingress rules.


Automation (Jenkins CI/CD)
---
Jenkinsfile
: Defines a Declarative Pipeline running these stages:
Checkout: Pulls code from GitHub.
Static Check: Verifies essential assets (index.html, etc.) are present.
Build Docker Image: Builds the image using the local Docker context.
Docker Push: Authenticates using Jenkins credentials (dockerhub-creds) and pushes the image to Docker Hub (lokeshreddy45/chatbot:latest).
Deploy: Automatically applies all Kubernetes manifests (k8s/).
Rollout Verification: Runs kubectl rollout status to check if pods start successfully without crashing.

Observability (Prometheus & Grafana)
---
Prometheus (prometheus.yaml):
Scrapes Kubernetes core metrics (via cAdvisor) to measure CPU usage, Memory limits, and network throughput of the chatbot containers.
Permissions are set up via a ServiceAccount, ClusterRole, and ClusterRoleBinding so Prometheus can read Pod/Node stats from the Kubernetes API server.
Grafana (grafana.yaml):
Connects to Prometheus as a data source using the internal cluster address (http://prometheus-service:9090).
Displays graphs mapping Pod health, CPU usage, RAM allocation, and network ingress/egress.
