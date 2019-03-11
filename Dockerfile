FROM node:11.10.1-alpine
MAINTAINER haozi.dev. <i@haozi.moe>
WORKDIR /app

COPY package*.json ./
#RUN npm install --registry=https://registry.npm.taobao.org
RUN npm install
COPY . .

#VOLUME ["/app/config"]

EXPOSE 3000

ENV APP_ENV docker

CMD ["npm", "start"]
