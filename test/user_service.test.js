const test = require('ava');
const crypto = require('crypto');
const request = require('./request');
const error_code = require('../config/error_codes');

test.serial.before(async () => {
  /**
   *  辣鸡 https://ethereal.email/
   */
  // const account = await nodemailer.createTestAccount();
  // config.mail.smtp = {
  //   host: account.smtp.host,
  //   port: account.smtp.port,
  //   secure: account.smtp.secure,
  //   auth: {
  //     user: account.user,
  //     pass: account.pass,
  //   },
  // };
  /* eslint-disable */
  const app = require('../src/app');
  await app();
});

let user_register_info = {
  username: crypto.randomBytes(15).toString('hex'),
  password: crypto.randomBytes(15).toString('hex'),
  email: `${crypto.randomBytes(4).toString('hex')}@haozi.moe`,
}
let register_verify_url = '';

test.serial('测试注册 POST /api/user', async t => {
  const data = await request.post('/user', user_register_info);
  t.is(data.code, 200)
  console.log(data)
  register_verify_url = data.data.url.replace(/^.*(api)/, '');
});

test.serial('测试重复注册 POST /api/user', async t => {
  try {
    await request.post('/user', user_register_info);
  } catch (e) {
    t.is(e.response.data.code, error_code.REGISTER_EMAIL_EXISTS);
  }
});

test.serial('验证邮箱 GET /api/email/register_verify', async t => {
  console.log(register_verify_url)
  const data = await request.get(register_verify_url, user_register_info);
  t.is(data.code, 200)
})

