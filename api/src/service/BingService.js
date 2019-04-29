const axios = require('axios');
const bingScrapping = require('../scraping/BingScrapping')

module.exports = {    

    async search(keyword, first) {

        const normalizedKeyword = encodeURIComponent(keyword)

        return axios({
            method: 'get',
            url: `https://www.bing.com/search?q=${normalizedKeyword}&first=${first}`,

        }).then(response => {

            return bingScrapping.getTitlesAndLinks(response.data)
        })
    }
}