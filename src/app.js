/**
 * voting_system - app.js
 */
require('colors');
const express = require('express')();
const logger = require('./common/logger');

const error_handler = require('./middlewares/error_handler')
const user_auth = require('./middlewares/user_auth')

const main = async () => {
  express.use(error_handler);
  express.use(user_auth);
};

main().then(logger.info).catch(logger.error);
