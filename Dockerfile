# Stage 1: Build frontend
FROM node:22.9.0-slim AS frontend-builder

WORKDIR /app/frontend

COPY frontend/ ./
RUN npm install
RUN npm run build

# Stage 2: Build backend
FROM node:22.9.0-slim AS backend-builder

WORKDIR /app/backend

COPY backend/ ./
RUN npm install
RUN npm run build

# Stage 3: Final stage
FROM node:22.9.0-alpine

WORKDIR /app

# Copy built frontend from frontend-builder stage
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Copy backend source code and node_modules from backend-builder stage
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/package.json ./backend
WORKDIR /app/backend
RUN npm install --omit=dev

CMD ["npm", "run", "start"]
