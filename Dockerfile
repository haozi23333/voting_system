FROM node:11.10.1-alpine
WORKDIR /app

# 安装依赖单独做一层
COPY package*.json ./
RUN npm install
VOLUME ["/app/config"]
COPY . .

EXPOSE 3000

ENV APP_ENV docker

CMD ["npm", "start"]
