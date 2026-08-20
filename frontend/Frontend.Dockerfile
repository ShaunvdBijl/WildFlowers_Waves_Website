# Development Dockerfile - runs the CRA dev server with hot reload.

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV WATCHPACK_POLLING=true

CMD ["npm", "start"]
