// const test = require('ava');
// const moment = require('moment');
// const request = require('./request');
//
// const user_info = require('./user_info')
//
// test.serial('创建投票 POST /vote', async (t) => {
//   const { code } = await request.post('/vote', {
//     name: '投票名称',
//     candidate: ['A', 'C', 'B', 'D'],
//     start_time: moment().toDate(),
//     end_time: moment().add(1, 'days'),
//   }, user_info.headers);
//   t.is(code, 200);
// });
