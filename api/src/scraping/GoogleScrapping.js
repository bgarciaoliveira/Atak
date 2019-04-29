
module.exports = {
    
    getTitlesAndLinks: htmlData => {

        // Os resultados ficam dentro da div "r"
        // Iremos pegar todas essas divs e separar em um array
        const data = htmlData.match(/<div class="r">(.*?)<\/h3>/gi)          
        
        if(data !== null){ // Isso significa que temos resultados pela keyword pesquisada

            // Array auxiliar para retorno
            const arr = []

            data.forEach(element => {
                //Extracao do titulo e link de cada resultado
                let title = element.match(/<h3 class=(.*?)>(.*?)<\/h3>/gi).join().replace(/<h3 (.*?)>/, '').replace('</h3>', '')
                let link = element.match(/<a(.*?)"(.*?)"/gi).join().replace(/<a(.*?)"/gi, '').replace('"', '')

                //Montagem do array de retorno            
                arr.push({
                    title,
                    link
                })            
            })

            return arr
        }        
    }
}