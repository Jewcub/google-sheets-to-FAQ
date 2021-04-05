FROM node:14-slim

WORKDIR /usr/src/app/server
COPY /server/package.json ./
COPY /server/yarn.lock ./
RUN yarn install

WORKDIR /usr/src/app/client
COPY /client/package.json ./
COPY /client/yarn.lock ./
RUN yarn install

WORKDIR /usr/src/app
COPY . ./

CMD [ "yarn", "start" ]