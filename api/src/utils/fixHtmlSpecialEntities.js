
// Substitui os html special entities pelo correspondente no teclado

module.exports = (text) => {

    return unescape(text.replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"'))   

    

}