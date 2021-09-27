FROM node:14-alpine
COPY package*.json ./
RUN npm install
WORKDIR /app
COPY . .
EXPOSE 8080
CMD npx nodemon server.js