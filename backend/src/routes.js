const express = require('express')
const ongService = require('./service/ongsService')
const incidentService = require('./service/incidentService')
const profileService = require('./service/profileService')
const sessionService = require('./service/sessionService')
const { celebrate, Joi, Segments} = require('celebrate')

const routes = express.Router()

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    state: Joi.string().required().length(2),

  })
}), ongService.create)
routes.get('/ongs', ongService.index)

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
}), incidentService.create)

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), incidentService.index)

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), incidentService.delete)

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), profileService.index)

routes.post('/session', sessionService.login)

module.exports = routes