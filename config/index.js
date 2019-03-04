/**
 * 处理一下读取的默认配置文件
 */


const envs = ['test', 'production', 'development'];
const { APP_ENV } = process.env;

if (!envs.includes(APP_ENV)) {
  throw new Error(`ENV \`APP_ENV\` 必须是 ${envs} 的其中一个`);
}

/* eslint-disable */
module.exports = require(`./config.${APP_ENV}`)
