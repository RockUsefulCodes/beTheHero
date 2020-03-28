const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach( async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should create a new ONG', async () => {
    const data = await request(app)
      .post('/ongs')
      .send({
        name: "APAD",
        email: "contato@apad.com",
        whatsapp: "62982549357",
        city: "Goiânia",
        state: "GO"
      })

      expect(data.body.id).toHaveLength(8)
  })
})
