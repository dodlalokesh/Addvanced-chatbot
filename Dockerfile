# Base image: stable Nginx running on Alpine Linux
FROM nginx:alpine

# Add labels for image metadata
LABEL maintainer="Antigravity DevOps Team" \
      app="omnisolve-chatbot" \
      version="1.0.0"

# Copy local application code into Nginx default public hosting folder
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY logo.svg /usr/share/nginx/html/

# Expose HTTP port 80 to the network
EXPOSE 80

# Run Nginx in the foreground so the container doesn't exit immediately
CMD ["nginx", "-g", "daemon off;"]
