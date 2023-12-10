FROM node:20 as build-stage

WORKDIR /server-ui
COPY package*.json ./
COPY package-lock.json ./
COPY . .
RUN npm install

# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# FROM nginx:1.18.0

#COPY --from=build-stage /server-ui/build /usr/share/nginx/html
 EXPOSE 3000

CMD ["npm", "start"]
