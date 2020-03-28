const db = require('../database/connection')
const generateUniqueId = require('../utils/idGenerator')

module.exports = {
  async create(req, resp) {
    const { name, email, whatsapp, city, state } = req.body
    const id = generateUniqueId()
  
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