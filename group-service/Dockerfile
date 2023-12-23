FROM ubuntu
FROM node

WORKDIR /group-service

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5004

CMD ["yarn", "start"]
