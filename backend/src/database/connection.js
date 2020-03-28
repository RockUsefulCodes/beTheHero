const knex = require('knex')
const config = require('../../knexfile')

const env = process.env.NODE_ENV
const connection = knex(env === 'test' ? config.test : config.development)

module.exports = connection