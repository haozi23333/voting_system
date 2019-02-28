const path = require('path');

module.exports = {
  env: process.ENV || 'development',
  debug: false,
  /**
     *  可以外部访问的 Url, 注册邮件等需要
     */
  export_url: 'http://127.0.0.1:3000',

  /**
     * 邮件相关参数
     */
  email: {
    /**
         * smtp 参数
         */
    smtp: {
      host: 'smtp.opl.conoha.io',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        // user: 'support@opl.conoha.io', // generated ethereal user
        user: 'support@opl.site', // generated ethereal user
        pass: 'Puliu99@126.com', // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    },

  },
  database: {
    mongo: {
      url: '',
    },
  },
  cache: {
    redis: {
      url: '',
    },
  },
  security: {
    salt: '8662bb0caae045f6e4bc44976d2e6375',
  },
  log: {
    dir: path.join(__dirname, 'logs'),
  },
};
