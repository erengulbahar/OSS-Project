FROM node:18-alpine
LABEL authors="hakantekir"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

CMD [ "node", "consumer.js" ]