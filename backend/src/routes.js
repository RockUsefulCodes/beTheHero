const express = require('express')
const ongService = require('./service/ongsService')
const incidentService = require('./service/incidentService')
const profileService = require('./service/profileService')
const sessionService = require('./service/sessionService')

const routes = express.Router()

routes.post('/ongs', ongService.create)
routes.get('/ongs', ongService.index)

routes.post('/incidents', incidentService.create)
routes.get('/incidents', incidentService.index)
routes.delete('/incidents/:id', incidentService.delete)

routes.get('/profile', profileService.index)
routes.post('/session', sessionService.login)


module.exports = routes