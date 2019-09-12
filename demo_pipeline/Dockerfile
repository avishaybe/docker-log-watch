from node:10-slim

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm i --production

COPY app.js .

CMD node app.js