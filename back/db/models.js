import bcrypt from 'bcrypt'

class Usuario{
    /**
     * @param {string} email 
     * @param {string} username 
     * @param {string} password 
     */
    constructor(username, email, password){
        this.email = email
        this.username = username
        this.password = String(bcrypt.hashSync(password, 10))
    }

    /**
     * @param {string} password 
     * @returns {boolean}
     */
    checkPassword(password){
        return bcrypt.compareSync(password, this.password)
    }
    
    /**
     * @param {string} password 
     */
    setPassword(password){
        this.password = bcrypt.hashSync(password, 10)
    }
}



class Faixa{
    /**
     * @param {string} link
     * @param {string} nome
     * @param {number} duracao - in seconds
     * @param {number} posicao
     * @param {number} cod_album 
     * @param {string} descricao 
     * @param {number} vezes_tocada
     * @param {string} tipo_gravacao 
     * @param {string} tipo_composicao 
     */
    constructor(link, nome, duracao, posicao, cod_album, descricao, vezes_tocada, tipo_gravacao, tipo_composicao){
        this.cod_album = cod_album
        this.posicao = posicao
        this.tipo_composicao = tipo_composicao
        this.tipo_gravacao = tipo_gravacao
        this.duracao = duracao
        this.descricao = descricao
        this.nome = nome
        this.link = link
        this.vezes_tocada = vezes_tocada
        this.id_compositores = []
        this.id_interpretes = []
        this.id_playlists = []
    }
}


class Interprete{
    /**
     * @param {number} id 
     * @param {string} nome 
     * @param {string} tipo 
     */
    constructor(nome, id, tipo){
        this.id = id
        this.nome = nome
        this.tipo = tipo
        this.id_faixas = []
    }
}


class Compositor{
    /**
     * @param {number} id
     * @param {string} nome 
     * @param {Date} data_morte 
     * @param {Date} data_nascimento 
     * @param {string} cidade_nascimento 
     * @param {number} id_periodo_musical
     */
    constructor(nome, id, cidade_nascimento, data_nascimento, data_morte, id_periodo_musical){
        this.id = id
        this.nome = nome
        this.id_faixas = []
        this.data_morte = data_morte
        this.data_nascimento = data_nascimento
        this.cidade_nascimento = cidade_nascimento
        this.id_periodo_musical = id_periodo_musical
    }
}


class PeriodoMusical{
    /**
     * @param {number} id
     * @param {Date} data_fim
     * @param {Date} data_inicio 
     * @param {string} descricao 
     */
    constructor(id, descricao, data_inicio, data_fim){
        this.id = id
        this.data_fim = data_fim
        this.descricao = descricao
        this.data_inicio = data_inicio
    }
}


class Playlist{
    /**
     * @param {number} id 
     * @param {string} nome 
     * @param {number} tempo_exec - in seconds
     * @param {Date} data_criacao 
     */
    constructor(id, nome, tempo_exec, data_criacao){
        this.id = id
        this.nome = nome
        this.tempo_exec = tempo_exec
        this.data_criacao = data_criacao
        this.id_faixas = {}
    }
}


class Album{
    /**
     * @param {number} id
     * @param {string} nome
     * @param {string} descricao
     * @param {Date} data_compra
     * @param {Date} data_gravacao
     * @param {string} tipo_compra
     * @param {number} id_gravadora
     * @param {number} preco_compra
     */
    constructor(id, nome, id_gravadora, tipo_compra, descricao, data_gravacao, data_compra, preco_compra){
        this.id = id
        this.nome = nome
        this.descricao = descricao
        this.data_compra = data_compra
        this.tipo_compra = tipo_compra
        this.id_gravadora = id_gravadora
        this.preco_compra = preco_compra
        this.data_gravacao = data_gravacao
    }
}


class Gravadora{
    /**
     * @param {number} id 
     * @param {string} nome 
     * @param {string} endereco 
     * @param {string} homepage 
     * @param {number} telefone 
     */
    constructor(nome, id, endereco, homepage, telefone){
        this.id = id
        this.nome = nome
        this.endereco = endereco
        this.homepage = homepage
        this.telefone = telefone
    }
}




export {
    Album,
    Faixa,
    Usuario,
    Playlist,
    Gravadora,
    Compositor,
    Interprete,
    PeriodoMusical
}