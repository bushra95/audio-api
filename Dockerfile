FROM node:18-alpine

WORKDIR /app

# Install build dependencies including OpenSSL
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    openssl \
    openssl-dev

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy tsconfig files
COPY tsconfig*.json ./

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 5001

# Start the server
CMD ["npm", "start"] 