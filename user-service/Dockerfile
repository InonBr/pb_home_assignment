FROM ubuntu
FROM node

WORKDIR /user-service

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5001

CMD ["yarn", "start"]
