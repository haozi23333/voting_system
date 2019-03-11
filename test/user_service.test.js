import test from 'ava';
import request from './request';
import error_code from '../config/error_codes';
import user_register_info from './user_info';

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
let register_verify_url = '';

test.serial('测试注册 POST /api/user', async t => {
  const { code, data } = await request.post('/user', user_register_info);
  t.is(code, 200)
  register_verify_url = data.url.replace(/^.*(api)/, '');
});

test.serial('测试重复注册 POST /api/user', async t => {
  try {
    await request.post('/user', user_register_info);
  } catch (e) {
    t.is(e.response.data.code, error_code.REGISTER_EMAIL_EXISTS);
  }
});

test.serial('验证邮箱 GET /api/email/register_verify', async t => {
  const { code } = await request.get(register_verify_url);
  t.is(code, 200)
})

test.serial('登录 POST /session', async t => {
  const { code, data } = await request.post('/session', {
    email: user_register_info.email,
    password: user_register_info.password
  });
  t.is(code, 200)
  user_register_info.access_token = data.access_token;
  user_register_info.headers = {
    headers: {
      'Content-Type': 'application/json',
      'access-token': user_register_info.access_token
    }
  }
})

test.serial('登出 DELETE /session', async t => {
  console.log(t.context)
  const { code, data } = await request.delete('/session', {
    headers: {
      'access-token': user_register_info.access_token
    }
  })
  t.is(code, 200)
})
