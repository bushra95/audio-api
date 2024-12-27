FROM node:18-alpine

WORKDIR /app

# Install dependencies including build tools
RUN apk add --no-cache python3 make g++ openssl

# Copy package files and env
COPY package*.json .env ./
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy prisma schema first
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy remaining source code
COPY . .

# Build TypeScript
RUN tsc

# Make startup script executable
COPY startup.sh .
RUN chmod +x startup.sh

# Expose port
EXPOSE 5001

# Start command
CMD ["./startup.sh"] 