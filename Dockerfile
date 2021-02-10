FROM node:12-slim

WORKDIR /usr/src/app
COPY package.json ./
COPY ./yarn.lock ./
RUN yarn install

WORKDIR /usr/src/app/server
COPY ./server/package.json ./
COPY ./server/yarn.lock ./
RUN yarn install --production

WORKDIR /usr/src/app/client
COPY ./client/package.json ./
COPY ./client/yarn.lock ./
RUN yarn install --production

WORKDIR /usr/src/app
COPY . ./

CMD [ "yarn", "start" ]