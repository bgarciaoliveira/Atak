const axios = require('axios');
const googleScrapping = require('../scraping/GoogleScrapping')

module.exports = {    

    search(keyword, first) {

        const normalizedKeyword = encodeURIComponent(keyword)

        return axios({
            method: 'get',
            url: `https://www.google.com.br/search?q=${normalizedKeyword}&oq=${normalizedKeyword}&ie=UTF-8&start=${first}`,

            headers: {
                'Accept-Charset': 'utf-8',
                // Necessario definir um UserAgent para receber a resposta do Google com acentuacao (utf-8)
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0'
            },

        }).then(response => {
            return googleScrapping.getTitlesAndLinks(response.data)
        })
    }
}