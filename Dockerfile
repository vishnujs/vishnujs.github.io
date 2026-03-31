# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies (reproducible)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Runtime stage (static file server)
FROM nginx:1.27-alpine

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Basic SPA routing support (optional): for CRA this isn't strictly needed unless
# you use client-side routing.
CMD ["nginx", "-g", "daemon off;"]
