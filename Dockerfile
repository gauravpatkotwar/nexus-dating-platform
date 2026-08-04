FROM node:20-alpine AS base

WORKDIR /app

# Copy root package definitions
COPY package*.json ./
COPY domain-engine ./domain-engine
COPY deploy-self-hosted.sh ./

# Copy Frontend
COPY frontend ./frontend
RUN cd frontend && npm ci && npm run build

EXPOSE 80 443 53/udp 3000 4000

CMD ["node", "domain-engine/native-core-gateway.js"]
