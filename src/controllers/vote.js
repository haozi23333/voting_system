const Joi = require('joi');
const error_code = require('../../config/error_codes');
const http_error = require('../common/error');
const { Vote } = require('../models');

module.exports = {};

/**
 * 创建投票
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.create_vote = async (req, res, next) => {
  if (!req.user) {
    throw new http_error('未登录, 无权限', error_code.NOT_LOGGED_IN, null, 401);
  }

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    candidate: Joi.array().items(Joi.string()).min(2).unique().required(),
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
  }).required();

  const { error, value } = Joi.validate(req.body, schema);

  if (error) {
    throw error;
  }

  const vote = new Vote({
    ...value,
    create_by: req.user._id
  });
  await vote.save();

  res.status(200).send({
    code: 200,
    data: vote
  })
  await next();
};


/**
 * 分页查询列表
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
      data: await Vote.findOne({ _id: id })
    })
  }
}


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
  const list = await Vote.find().skip((page - 1) * size).limit(size).sort({created_at: -1})
  res.status(200).send({
    code: 200,
    data: {
      count,
      list
    }
  })
}
