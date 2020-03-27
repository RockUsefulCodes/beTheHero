const db = require('../database/connection')

module.exports = {
  async login(req, resp) {
    const {id} = req.body
    const data = await db.select('name').from('ongs').where('id', id).first()

    return resp.json(data)
  }
}