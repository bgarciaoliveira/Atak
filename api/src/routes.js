const express = require('express')
const routes = express.Router()

const searchController = require('./controllers/SearchController')

routes.get('/search', searchController.search)

module.exports = routes