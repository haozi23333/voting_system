import {randomBytes} from "crypto";

import {User} from "../models/user";

import {send_register_mail} from "./email";

import redis from "./redis";
import redis_keys from "../../config/redis_keys";
import error_code from "../../config/error_codes";
import HttpError from "../common/error";
import * as security from "../common/security";


/**
 * 注册账户
 * @param username
 * @param password
 * @param email
 * @returns {Promise<void>}
 */
export const register = async (username, email, password) => {
  const salt = randomBytes(8).toString('hex');
  const secure_password = security.gen_cecurity_password(password + salt);

  if (await User.findOne({ email })) {
    throw new HttpError('重复的邮箱  已经被注册', error_code.REGISTER_EMAIL_EXISTS, null, 400);
  }
  const user = new User({
    username,
    password: secure_password,
    email,
    salt,
  });

  await user.save();
  const url = await send_register_mail(user);

  return url;
};

/**
 * 登录
 * @param key
 * @param password
 * @returns {Promise<void>}
 */
export const login = async (email, password) => {
  const user = await User.findOne({
    email,
  });

  if (user.password !== security.gen_cecurity_password(password + user.salt)) {
    throw new HttpError('用户名或密码错误', error_code.LOGIN_FAILD_PASSWORD_ERROR, null, 400);
  }

  const access_token = security.gen_cecurity_access_token(user);
  const res = {
    _id: user._id,
    email: user.email,
    access_token: access_token[0],
    is_register_verify: user.is_register_verify,
  };

  await redis.set(redis_keys.user_session_key(user._id), JSON.stringify(res), 'EX', 7 * 60 * 60 * 24 * 1000);

  res.access_token = Buffer.from(access_token.join(',')).toString('base64');
  return res;
};

/**
 * 用 AccessToken 登陆
 * @param user_id
 * @param access_token
 * @returns {Promise<*>}
 */
export const login_with_access_token = async (user_id, access_token) => {
  const user_str = await redis.get(redis_keys.user_session_key(user_id));
  if (!user_str) {
    return null;
  }
  const user = JSON.parse(user_str);
  if (user.access_token !== access_token) {
    return null;
  }
  return user;
};

/**
 * 登出
 * @param user_id
 * @returns {Promise<*>}
 */
export const logout = async user_id => redis.del(redis_keys.user_session_key(user_id));

/**
 * 获取session
 * @param user_id
 * @returns {Promise<*>}
 */
export const get_session = async user_id => redis.get(redis_keys.user_session_key(user_id));
