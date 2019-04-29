//https://stackoverflow.com/questions/16799469/how-to-check-if-a-string-is-a-natural-number

module.exports = (n) => {
    n = n.toString()
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}