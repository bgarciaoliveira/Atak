//API criada por Bruno Garcia de Oliveira

const express = require('express')
const app = express()

const sendData = require('./middlewares/SendDataMiddleware')

app.use(sendData)
app.use('/api', require('./routes'))

app.listen(3001)

console.log('Servidor iniciado na porta 3001');
