# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Expose API port
EXPOSE 5000

# Run in development mode with hot reload
CMD ["npm", "run", "dev"]
