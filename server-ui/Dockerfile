FROM node:20 as development
ENV NODE_ENV development
WORKDIR /server-ui
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3000
CMD ("npm", "start")