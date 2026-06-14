# DevOps Integration & Requirements Guide

This document lists the prerequisites, structural requirements, and detailed instructions to run, deploy, and monitor the **OmniSolve AI** chatbot using Docker, Minikube, Jenkins, Prometheus, and Grafana.

---

## 🛠️ System Prerequisites

To run this DevOps stack on your system (such as your AWS `m7i-flex.large` instance or local machine), ensure the following tools are installed:

1. **Docker Engine / Desktop**: For container builds and runtimes.
2. **Minikube**: Local single-node Kubernetes cluster.
3. **kubectl**: Kubernetes command-line controller.
4. **Jenkins Server**: For running CI/CD automation pipelines.

---

## 🚀 Step 1: Start and Configure Minikube

1. Start your local Minikube cluster:
   ```bash
   minikube start --driver=docker --memory=4096 --cpus=2
   ```
2. Enable the built-in Nginx Ingress Controller addon:
   ```bash
   minikube addons enable ingress
   ```
3. Point your terminal's Docker client to Minikube's internal Docker daemon:
   ```bash
   eval $(minikube -p minikube docker-env)
   ```
   *Note: This allows you to build Docker images directly inside Minikube without pushing them to an external registry.*

---

## 🐳 Step 2: Build the Chatbot Image

Build the Docker image inside Minikube's daemon context so Kubernetes can reference it:
```bash
docker build -t omnisolve-chatbot:latest .
```

---

## ☸️ Step 3: Deploy the Kubernetes Manifests

Apply the deployment, service, ingress, and monitoring manifests in order:
```bash
# 1. Deploy the Chatbot Application
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# 2. Deploy Prometheus & Grafana Monitoring Stacks
kubectl apply -f k8s/prometheus.yaml
kubectl apply -f k8s/grafana.yaml

# 3. Configure local Ingress routing rules
kubectl apply -f k8s/ingress.yaml
```

Verify that all pods are running successfully:
```bash
kubectl get pods,svc,ingress
```

---

## 🌐 Step 4: Configure Local DNS (Hosts File)

To access your applications using local domains in your web browser, configure host mapping:

1. Retrieve the IP address of your Minikube cluster:
   ```bash
   minikube ip
   ```
   *(Let's assume the returned IP is `192.168.49.2`)*

2. Open your system's hosts file in administrator mode:
   * **Windows**: `C:\Windows\System32\drivers\etc\hosts`
   * **Linux/macOS**: `/etc/hosts`

3. Append the following lines at the end of the hosts file (replace `192.168.49.2` with your actual Minikube IP):
   ```text
   192.168.49.2  omnisolve.local
   192.168.49.2  prometheus.local
   192.168.49.2  grafana.local
   ```

Now, open your web browser and navigate to the following endpoints:
* **Chatbot Interface**: [http://omnisolve.local](http://omnisolve.local)
* **Prometheus Dashboard**: [http://prometheus.local](http://prometheus.local)
* **Grafana Panel**: [http://grafana.local](http://grafana.local)

---

## 📊 Step 5: Configure Prometheus & Grafana Integration

1. Log into Grafana via [http://grafana.local](http://grafana.local) (Default login: Username `admin` / Password `admin`).
2. Navigate to **Connections ➔ Data Sources ➔ Add Data Source**.
3. Select **Prometheus**.
4. In the HTTP URL field, enter the internal Kubernetes DNS endpoint of your Prometheus service:
   ```text
   http://prometheus-service.default.svc.cluster.local:9090
   ```
5. Click **Save & Test**. You should see a green success message.
6. Create dashboard panels using PromQL queries (e.g. `container_cpu_usage_seconds_total` or `container_memory_working_set_bytes`) to track your chatbot pods' CPU and RAM usage in real-time.

---

## ⚙️ Step 6: Configure CI/CD in Jenkins

To automate this workflow using the **Jenkinsfile**:

1. Log in to your Jenkins Server.
2. Click **New Item**, name it `omnisolve-chatbot-pipeline`, select **Pipeline**, and click **OK**.
3. Under the **Pipeline** configuration section:
   - Select **Definition**: *Pipeline script from SCM*.
   - **SCM**: *Git*.
   - **Repository URL**: Path or Git URL of your repository.
   - **Script Path**: `Jenkinsfile`.
4. Click **Save**.
5. Click **Build Now** to execute the pipeline. Jenkins will pull the code, verify assets, build the Docker image in Minikube, apply the deployments, and verify metrics health!
