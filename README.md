# 🚀 OmniSolve AI – DevOps Project

## 📌 Overview

OmniSolve AI is a **client-side interactive chatbot application** designed to solve real-world coding, networking, and DIY hardware issues in real time.

Unlike traditional chatbots that provide static text responses, OmniSolve AI delivers **interactive, actionable solutions**, including:

- ✅ Step-by-step diagnostic checklists  
- ✅ Copy-on-click console commands  
- ✅ Structured code diffs  
- ✅ Smart warnings and guidance  

---

## 🎯 Project Purpose

This project demonstrates a **complete end-to-end DevOps pipeline**, including:

- Containerization with Docker  
- Kubernetes orchestration using Minikube  
- CI/CD automation with Jenkins  
- Observability using Prometheus & Grafana  

---

# 🏗️ System Architecture

> Below is the high-level architecture showing how the application is deployed, exposed, and monitored.

images/architecture.png

---

# 🔧 Component Breakdown

---

## 1️⃣ Application Layer (Chatbot)

### 🔹 Frontend
- Built using:
  - HTML5  
  - CSS3 (Dark Glassmorphic UI)  
  - Vanilla JavaScript (ES6+)  

### 🔹 Features
- Interactive troubleshooting workflows  
- Dynamic checklist-based debugging  
- Progress tracking UI  

### 🔹 Smart Routing
- Detects keywords and routes user queries dynamically across:
  - Coding  
  - Networking  
  - Hardware  

---

## 2️⃣ Containerization (Docker)

### 🔹 Dockerfile
- Base Image: **Nginx Alpine**
- Copies static files to:
 
