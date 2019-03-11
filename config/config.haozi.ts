import base_config = require('./config.default');

const config = {
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
};

module.exports = Object.assign(base_config, config);
