const db = require('../database/connection')
const crypto = require('crypto')

module.exports = {
  async create(req, resp) {
    const { name, email, whatsapp, city, state } = req.body
    const id = crypto.randomBytes(4).toString('HEX')
  
    console.log(req.body)
  
    await db('ongs').insert(
      {
        id, name, email, whatsapp, city, state
      })
  
    return resp.json({ id })
  },

  async index(req, resp) {
    const ongs = await db.select('*').from('ongs')
    return resp.json(ongs)
  }
}