"use strict";
/**
 * Edge Node Deployment
 * Brand-neutral deployment utilities and templates
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDockerfile = generateDockerfile;
exports.generateDockerCompose = generateDockerCompose;
exports.generateKubernetesDeployment = generateKubernetesDeployment;
/**
 * Generate Dockerfile template
 */
function generateDockerfile(config) {
    return `FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy application
COPY . .

# Set environment variables
ENV SETTLER_NODE_KEY=${config.nodeKey}
ENV SETTLER_CLOUD_API_URL=${config.cloudApiUrl}
ENV SETTLER_DATA_DIR=/app/data

# Create data directory
RUN mkdir -p /app/data

# Run application
CMD ["node", "dist/index.js", "start"]
`;
}
/**
 * Generate docker-compose template
 */
function generateDockerCompose(config) {
    return `version: '3.8'
services:
  edge-node:
    image: edge-node:latest
    environment:
      - SETTLER_NODE_KEY=${config.nodeKey}
      - SETTLER_CLOUD_API_URL=${config.cloudApiUrl}
    volumes:
      - ./data:/app/data
    restart: unless-stopped
`;
}
/**
 * Generate Kubernetes deployment template
 */
function generateKubernetesDeployment(config) {
    return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: edge-node
spec:
  replicas: 1
  selector:
    matchLabels:
      app: edge-node
  template:
    metadata:
      labels:
        app: edge-node
    spec:
      containers:
      - name: edge-node
        image: edge-node:latest
        env:
        - name: SETTLER_NODE_KEY
          valueFrom:
            secretKeyRef:
              name: edge-node-secrets
              key: node-key
        - name: SETTLER_CLOUD_API_URL
          value: "${config.cloudApiUrl}"
        volumeMounts:
        - name: data
          mountPath: /app/data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: edge-node-data
`;
}
//# sourceMappingURL=deployment.js.map