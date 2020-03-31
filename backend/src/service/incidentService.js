const db = require('../database/connection')

module.exports = {
  async index(req, resp) {
    const { page = 1 } = req.query

    const [count] = await db('incidents').count()

    const data = await db.select(
        ['incidents.*', 'ongs.name', 'ongs.email', 
          'ongs.whatsapp', 'ongs.city', 'ongs.state'])
      .limit(5)
      .offset((page -1 ) * 5)
      .from('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')


    resp.header('X-Total-Count', count['count(*)'])

    return resp.json(data)
  },

  async create(req, resp) {
    const { title, description, value } = req.body
    const ong_id = req.headers.authorization
    const [id] = await db('incidents').insert({ title, description, value, ong_id })
    return resp.json({ id })
  },

  async update(req, resp) {
    const ongId = req.headers.authorization
    const {id} = req.params
    const {title, description, value} = req.body


    const result = await db('incidents')
      .where({'id': id, 'ong_id': ongId})
      .update({title,description,value})

    return (result > 0) ? 
      resp.status(204).send() : 
      resp.status(401).json({ error: 'Operation not permitted' })
  },

  async delete(req, resp) {
    const { id } = req.params
    const ong_id = req.headers.authorization

    const incident = await db.select('ong_id')
      .from('incidents')
      .where('id', id)
      .first()

    if (incident.ong_id != ong_id) {
      return resp.status(401).json({ error: 'Operation not permitted' })
    }

    await db('incidents').where('id', id).delete()
    return resp.status(204).send()
  }
}