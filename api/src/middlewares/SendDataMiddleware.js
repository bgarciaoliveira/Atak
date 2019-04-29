const EasyXml = require('easyxml');

const serializer = new EasyXml({
    singularize: true,
    rootElement: 'response',
    dateFormat: 'ISO',
    manifest: true
});

// Criacao da funcao sendData para enviar em ambos formatos (json e xml) de forma automatica, definida pelo Content-Type do header da requisicao

module.exports = (req, res, next) => {
    
    res.sendData = obj => {
        if (req.accepts('json') || req.accepts('text/html')) {
            res.header('Content-Type', 'application/json')
            res.send(obj)
        } 
        
        else if (req.accepts('application/xml')) {
            res.header('Content-Type', 'text/xml')
            var xml = serializer.render(obj)
            res.send(xml)
        }
        else 
            res.send(406)
        
    }

    next();

}