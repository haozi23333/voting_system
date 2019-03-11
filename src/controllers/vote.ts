import Joi from "joi";
import error_code from "../../config/error_codes";
import HttpError from "../common/error";
import {Ticket, Vote} from "../models";

import redis from "../services/redis";
import redis_keys from "../../config/redis_keys";

module.exports = {};

/**
 * 创建投票
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export const create_vote = async (req, res, next) => {
  if (!req.user) {
    throw new HttpError('未登录, 无权限', error_code.NOT_LOGGED_IN, null, 401);
  }

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    candidate: Joi.array().items(Joi.string()).min(2).unique()
      .required(),
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
  }).required();

  const { error, value } = Joi.validate(req.body, schema);

  if (error) {
    throw error;
  }

  const vote = new Vote({
    ...value,
    create_by: req.user._id,
  });
  await vote.save();

  res.status(200).send({
    code: 200,
    data: vote,
  });
  return next();
};

/**
 * 更新投票信息
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.update_vote = async (req, res, next) => {
  const { id } = req.params;

  if (!req.user) {
    throw new HttpError('未登录, 无权限', error_code.NOT_LOGGED_IN, null, 401);
  }

  if (req.user.is_register_verify === 0) {
    throw new HttpError('请先验证邮箱', error_code.UNVERIFIED_MAIL, null, 401);
  }

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    candidate: Joi.array().items(Joi.string()).min(2).unique(),
    start_time: Joi.date(),
    end_time: Joi.date(),
  }).required();

  const { error, value } = Joi.validate(req.body, schema);

  if (error) {
    throw error;
  }

  const vote = await Vote.findOne({ _id: id });

  if (!vote) {
    throw new HttpError('不存在的 投票活动', error_code.ERROR_PARAMS, null, 400);
  }

  if (vote.user_id !== req.user._id) {
    throw new HttpError('无权限操作创建者不是你自己的活动', error_code.ERROR_PARAMS, null, 401);
  }

  const now = new Date();

  if (now > vote.start_time) {
    throw new HttpError('活动已经开始, 无法修改', error_code.ERROR_PARAMS, null, 400);
  }

  Object.keys(value).forEach((key) => {
    vote[key] = value[key];
  });

  await vote.save();

  res.status(200).send({
    code: 200,
    data: vote,
  });
  return next();
};

/**
 * 查询单个投票
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.find_one_with_id = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    res.status(200).send({
      code: 200,
      data: await Vote.findOne({ _id: id }),
    });
  }

  return next();
};


/**
 * 分页查询列表
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.query_all = async (req, res, next) => {
  const {
    page = 1,
    size = 10,
  } = req.query;

  const count = await Vote.count();
  const list = await Vote.find().skip((page - 1) * size).limit(size).sort({ created_at: -1 });
  res.status(200).send({
    code: 200,
    data: {
      count,
      list: await Promise.all(list.map(async (vote) => {
        const _vote = vote.toObject();
        _vote.result = await redis.hgetall(redis_keys.vote_count_key(vote._id));
        return _vote;
      })),
    },
  });
  return next();
};

/**
 * 创建票
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
module.exports.create_ticket = async (req, res, next) => {
  const { id } = req.params;
  const { values } = req.body;

  if (!req.user) {
    throw new HttpError('未登录, 无权限', error_code.NOT_LOGGED_IN, null, 401);
  }

  if (req.user.is_register_verify === 0) {
    throw new HttpError('请先验证邮箱', error_code.UNVERIFIED_MAIL, null, 401);
  }

  const vote = Vote.findOne({ _id: id });

  if (!vote) {
    throw new HttpError('不存在的 投票活动', error_code.ERROR_PARAMS, null, 400);
  }

  const now = new Date();

  if (vote.start_time < now || vote.end_time > now) {
    throw new HttpError('投票活动未开始或者已经过期', error_code.ERROR_PARAMS, null, 400);
  }

  let ticket = await Ticket.findOne({ user_id: req.user._id, vote_id: id });

  const schema = Joi.object().keys({
    values: Joi.array().items(Joi.string()).min(2)
      .max(Math.min(5, Math.floor(vote.candidate.length / 2)))
      .unique(),
  }).required();

  const { error, value } = Joi.validate(req.body, schema);

  if (error) {
    throw error;
  }

  value.forEach((val) => {
    if (vote.candidate.indexOf(val) === -1) {
      throw new HttpError('不存在的选项, 请重新提交', error_code.ERROR_PARAMS, null, 400);
    }
  });

  if (!ticket) {
    ticket = new Ticket({
      vote_id: id,
      values,
      user_id: req.user._id,
    });
    // 加入缓存
    const vote_counter_key = redis_keys.vote_count_key(id);
    await Promise.all(values.map(key => redis.hincrby(vote_counter_key, key, 1)));
  } else {
    ticket.values = values;
  }

  await ticket.save();

  res.status(200).send({
    code: 200,
    data: ticket,
  });
  return next();
};
/**
 * 修改投票
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.update_ticket = async (req, res, next) => {
  // TODO 修改投出的票
  await next();
}

/**
 * 分页查询票列表
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.query_all_ticket = async (req, res, next) => {
  const {
    page = 1,
    size = 10,
  } = req.query;
  const { id } = req.params;

  const count = await Ticket.count({ vote_id: id });
  const list = await Ticket.find({ vote_id: id })
    .skip((page - 1) * size)
    .limit(size).sort({ created_at: -1 });

  res.status(200).send({
    code: 200,
    data: {
      count,
      list,
    },
  });
  return next();
};
