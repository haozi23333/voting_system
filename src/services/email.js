const nodemailer = require('nodemailer');
const crypto = require('crypto');
const config = require('../../config');
const redis = require('./redis');
const redis_keys = require('../../config/redis_keys');

const transporter = nodemailer.createTransport(config.mail.smtp);

/**
 * 发送注册邮件
 * @param user
 * @returns {Promise<void>}
 */
async function send_register_mail(user) {
  const token = crypto.randomBytes(32).toString('hex');
  await redis.set(redis_keys.user_register_email_key(user._id), token, 'EX', 30 * 60 * 1000);

  const url = `${config.export_url}/email/register_verify?token=${Buffer.from(user._id + ',' + token).toString('base64')}`
  const message = {
    from: `Voting System <${config.mail.smtp.auth.user}>`,
    to: user.email,
    subject: '欢迎注册 Voting System, 请在30分钟之内验证有消息',
    text: `<a href="${url}">请点击验证</a> 这个邮箱, 有效期30分钟, 如果不是您注册的, 请忽略, 如果无法打开 请复制到浏览器 打开 ${url}`,
    html: `<a href="${url}">请点击验证</a> 这个邮箱, 有效期30分钟, 如果不是您注册的, 请忽略, 如果无法打开 请复制到浏览器 打开 ${url}`,
  };

  await transporter.sendMail(message);
}

module.exports = {
  nodemailer,
  send_register_mail,
};
