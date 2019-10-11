const Base = require('./base.js');
const knex = require('./knex');

class Clue extends Base {
  constructor(props = 'clue') {
    super(props);
  }

  joinUser(params={},pagination={}){
    let limit = pagination.limit || 10;
    console.log(limit)
    let page = pagination.page || 10;
    let offset = limit * (page - 1);
    return knex('clue')
      .leftJoin('user', 'clue.user_id', '=', 'user.id')
      .select(
        'clue.id',
        'clue.name',
        'clue.phone',
        'clue.utm',
        'clue.status',
        'clue.created_time',
        {'sales_name': 'user.name'},
      )
      .orderBy('id', 'desc')
      .where(params)
      .limit(limit)
      .offset(offset)
  }
}

module.exports = new Clue()