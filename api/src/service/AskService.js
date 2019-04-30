const axios = require('axios');
const askScrapping = require('../scraping/AskScrapping')

module.exports = {    

    search(keyword, first) {

        const normalizedKeyword = encodeURIComponent(keyword)

        let page = 1

        if(first !== 1){
            page = parseInt(first / 10) + 1
        }

        return axios({
            method: 'get',
            url: `https://www.ask.com/web?q=${normalizedKeyword}&page=${page}`,

            headers: {
                'Accept-Charset': 'utf-8',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0'
            },

        }).then(response => {
            return {
                titlesAndLinks: askScrapping.getTitlesAndLinks(response.data),
                resultStat: askScrapping.getResultStat(response.data)          
            }
        })
    }
}