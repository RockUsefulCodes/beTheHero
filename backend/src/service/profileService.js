const db = require('../database/connection')

module.exports = {
  async index(req, resp) {
    const ong_id = req.headers.authorization
    const data = await db.select('*').from('incidents').where('ong_id', ong_id)

    return resp.json(data)
  }
}