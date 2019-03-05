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
  const token = crypto.randomBytes(32).toString('base64');
  await redis.set(redis_keys.user_register_email_key(user._id), token, 'EX', 30 * 60 * 1000);

  const message = {
    from: `Voting System <${config.mail.smtp.auth.user}>`,
    to: user.email,
    subject: '欢迎注册 Voting System, 请在30分钟之内验证有消息',
    text: '',
    html: `<a href="${config.export_url}/email/verify?${(user._id + token).toString('base64')}"></a>`,
  };

  await transporter.sendMail(message);
}

module.exports = {
  nodemailer,
  send_register_mail,
};
