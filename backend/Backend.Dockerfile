FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
