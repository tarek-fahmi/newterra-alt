FROM node:20-alpine as deps

WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm ci

# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]