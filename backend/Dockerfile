# Stage 1 — Build dependencies
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --production && npm cache clean --force

COPY . .

# Stage 2 — Final runtime image
FROM node:22-alpine
WORKDIR /app

# Copy only required output (not full project)
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

EXPOSE 3000
CMD ["node", "src/app.js"]
