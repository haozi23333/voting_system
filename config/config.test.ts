const base_config = require('./config.default');

const config = {
  env: 'test',
};

module.exports = Object.assign(base_config, config);
