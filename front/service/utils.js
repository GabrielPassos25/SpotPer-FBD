const filter_faixas = (faixas, faixa) => {
    let temp = myregex(faixa.toLowerCase())
    return faixas.filter(f => f.nome.toLowerCase().match(temp))
}

const myregex = str => {
    let s = '.*'
    for(let i in str) s += str[i] + '.*'
    return s
}

export {
    myregex,
    filter_faixas
}
