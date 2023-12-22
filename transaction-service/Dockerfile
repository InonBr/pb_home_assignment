FROM ubuntu
FROM node

WORKDIR /transaction-service

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5002

CMD ["yarn", "start"]
