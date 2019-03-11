const base_config = require('./config.default');

const ENV = process.env;

const config = {
  env: ENV.APPENV || 'docker',
  port: ENV.PORT || 3000,
  export_url: ENV.EXPORT_URL || 3000,
  database: {
    mongo: {
      url: ENV.MONGO_URL || 'mongodb://localhost:27017/zs',
    },
  },
  cache: {
    redis: {
      url: ENV.REDIS_URL || 'redis://127.0.0.1',
    },
  },
};

module.exports = Object.assign(base_config, config);
