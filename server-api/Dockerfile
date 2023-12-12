FROM node:20

# Instal MySQL client
RUN apt-get update && apt-get install -y mysql-client

WORKDIR /server-api
COPY package*.json ./
COPY package-lock.json ./
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]

