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

# Generate Prisma client and push schema
RUN npx prisma generate
RUN npx prisma db push --accept-data-loss

# Copy remaining source code
COPY . .

# Build TypeScript
RUN tsc

# Expose port
EXPOSE 5001

# Start command
CMD ["npm", "start"] 