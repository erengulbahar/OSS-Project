FROM node:latest
LABEL authors="erengulbahar"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

CMD [ "node", "consumer.js" ]
