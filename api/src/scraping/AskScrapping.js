
module.exports = {

    getTitlesAndLinks: htmlData => {

        htmlData = htmlData.replace(/\n|\t/g, ' ')

        const targetSections = htmlData.match(/<a class="PartialSearchResults(.*?)<\/a>/gi)


        if(targetSections !== null){

            const arr = []

            targetSections.forEach(section => {

                const stripedData = section
                    .replace('<a class="PartialSearchResults-item-title-link result-link"', '')
                    .replace('target="_blank"', '')
                    .replace(/data-unified='{(.*?)}' /gi, '')
                    .replace(/rel='(.*?)'>/gi, '')
                    .replace('</a>', '')
                    .replace("href='", '')
                    .trimLeft()
                    .trimRight()
                    .split("'")

                if(stripedData.length == 2){

                    //Montagem do array de retorno            
                    arr.push({
                        title: stripedData[1].trimLeft(),
                        link: stripedData[0]
                    })            

                }
            })

            return arr
        }
    },

    getResultStat: htmlData => {
        return 0
    }
}