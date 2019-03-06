const path = require('path');

module.exports = {
  env: process.ENV || 'development',
  port: 3000,

  debug: false,
  /**
   *  可以外部访问的 Url, 注册邮件等直接拼接的地址
   */
  export_url: 'http://127.0.0.1:3000',

  /**
   * 邮件相关参数
   * 参数详见  https://nodemailer.com/smtp/
   */
  mail: {
    smtp: {
      host: 'smtp.haozi.conoha.io',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'vs@haozi.dev', // generated ethereal user
        pass: ',CEsWjxf?!^eV3]zKGtd', // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  },
  database: {
    mongo: {
      url: 'mongodb://localhost:27017/zs',
    },
  },
  cache: {
    redis: {
      url: 'redis://127.0.0.1',
    },
  },
  security: {
    user_salt: '',
  },
  log: {
    dir: path.join(__dirname, '..', 'logs'),
  },
};
