const bingService = require('../service/BingService')
const googleService = require('../service/GoogleService')
const isNaturalNumber = require('../utils/isNaturalNumber')

module.exports = {

    async search(req, res) {
        const keyword = req.query.keyword
        const engine = req.query.engine.toLowerCase()
        const first = isNaturalNumber(req.query.first) ? req.query.first : 1

        // Verificacao de seguranca para bloquear possiveis ataques de overflow
        if (keyword.length <= 255) {

            if (engine === 'bing') {

                const data = await bingService.search(keyword, first)

                return (data.titlesAndLinks !== undefined && data.resultStat !== 0) ? res.status(200).sendData(data) : res.sendStatus(204)
            }

            else if (engine === 'google') {

                const data = await googleService.search(keyword, first)

                return data !== undefined ? res.status(200).sendData(data) : res.sendStatus(204)
            }
        }

        res.sendStatus(400)
    }
}