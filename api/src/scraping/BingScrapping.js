const fixHtmlSpecialEntities = require('../utils/fixHtmlSpecialEntities')

module.exports = {
    
    getTitlesAndLinks: htmlData => {

        // Os resultados ficam dentro dos <h2>
        // Iremos pegar todos eles e separar em um array
        // Iremos filtrar os anuncios tambem
        const data = htmlData.match(/<h2>(.*?)<\/h2>/gi).filter(line => !line.includes('data-url="https://www.bing.com/aclick'))     
        
        if(data !== null){ // Isso significa que temos resultados pela keyword pesquisada

            // Array auxiliar para retorno
            const arr = []

            data.forEach(element => {
                //Extracao do titulo e link de cada resultado
                let title = fixHtmlSpecialEntities(element.match(/<a(.*?)<\/a>/gi).join().replace(/<a(.*?)>/gi, '').replace('</a>', '').replace('<strong>', '').replace('</strong>', ''))

                let link = element.match(/<a href="(.*?)"/gi).join().replace('<a href="', '').replace('"', '')

                //Montagem do array de retorno            
                arr.push({
                    title,
                    link
                })            
            })

            return arr
        }        
    },

    getResultStat: htmlData => {
        // Iremos pegar a quantidade de resultados
        // Ficam dentro da span "sb_count"

        const data = htmlData.match(/<span class="sb_count">(.*?)<\/span>/gi)

        if(data !== null){

            const dataStr = data.join().toLowerCase()

            return parseInt(
                dataStr.replace(/<span(.*?)>/gi, '').replace(' resultados</span>', '').replace(/\./g, '')
            )
        }

        return 0
    }
}