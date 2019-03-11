const base_config = require('./config.default');

const config = {
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
};

module.exports = Object.assign(base_config, config);
