FROM ubuntu
FROM node

WORKDIR /notification-service

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5003

CMD ["yarn", "start"]
