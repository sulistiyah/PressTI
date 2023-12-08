FROM node:20

WORKDIR /server-api
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
#CMD ["node", "server.js"]

