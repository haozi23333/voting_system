# 投票系统

*一个用到了很多模块的小投票*

> 这其实是一个面试题来着的, 有需要的可以参考一下~



# check_list


- [ ] 用户系统
    - [x] 注册
    - [x] 登录
    - [x] 邮箱验证
      - [x] 基本功能
      - [ ] 消息队列优化
    - [x] 单元测试
- [ ] 投票系统
    - [x] 增删查改
    - [x] 缓存
    - [ ] 单元测试
- [ ] 管理系统(放弃)
- [ ] 接口文档
- [x] 部署
    - [x] 文档
    - [ ] docker-compose



## 测试

`npm run test` 执行单元测试

`npm run test:b` 执行带输出格式化的单元测试反馈

`npm run coverage` 执行带代码覆盖率检测的单元测试

`npm run start`  开启服务

##  部署

### 自行搭建基本服务

本项目依赖了 `mongodb`, `redis`, 搭建完成之后请修改 

`config/config.default.js`以及相关环境的 `config/config/{APP_ENV}.js` 的配置文件

### 使用 Docker 镜像构建

默认是用 `3000` 端口

`$ docker run -d -p 3000:3000 haozi23333/voting_system`

现在你可以访问 [http://127.0.0.1:3000](http://127.0.0.1:3000)的 API了

#### 环境变量参数

| 参数名     | 注释           | 值                           |
| ---------- | -------------- | ---------------------------- |
| APPENV     | 环境变量       | docker                       |
| PORT       | 端口           | 3000                         |
| EXPORT_URL | 外部访问的路径 | http://127.0.0.1:3000        |
| MONGO_URL  | mongo 链接地址 | mongodb://localhost:27017/zs |
| REDIS_URL  | redis 链接地址 | redis://127.0.0.1            |



### 使用 docker-compose

见 `docker-compose.yml`



### API 文档

coming soon!