FROM node:12-slim

WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install

WORKDIR /usr/src/app/server
COPY ./server/package.json ./
RUN yarn install --production

WORKDIR /usr/src/app/client
COPY ./client/package.json ./
RUN yarn install --production

WORKDIR /usr/src/app
COPY . ./

CMD [ "yarn", "start" ]