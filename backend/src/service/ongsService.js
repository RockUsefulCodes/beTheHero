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

  async update(req, resp) {
    const {id} = req.params
    const {name, email, whatsapp, city, state} = req.body

    await db('ongs')
      .update({name,email,whatsapp,city,state})
      .where('id', id)

    return resp.status(204).send()
  },

  async detail(req, resp) {
    const ong = await db('ongs').where('id', req.params.id).first()
    return resp.json(ong)
  },

  async index(req, resp) {
    const ongs = await db.select('*').from('ongs')
    return resp.json(ongs)
  }
}