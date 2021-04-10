import sql from 'mssql'
import config from './config.js'
import { Usuario, Faixa, Playlist, Album } from './models.js'


const onError = (err, cb) => {
    if (err.code == 'ESOCKET') {
        console.log("\x1b[31mErro ao tentar se conectar com o banco!\x1b[0m")
        cb(err)
    } else cb(err)
}

/**
 * @param {String} query 
 * @param {function(*)} cb - called on success
 * @param {function(*)} err - called on error
 */
const query = (query, cb, err) => {
    sql.connect(config).then(con => {
        con.request().query(query).then(res => {
            cb(res)
        }, ex => onError(ex, err))
    }, ex => onError(ex, err))
}

/**
 * @param {Usuario} user 
 * @param {function(*)} cb - called on success
 * @param {function(*)} err - called on error
 */
const addUser = (user, cb, err) => {
    let Query = `insert into Usuario values(
        '${user.email}',
        '${user.username}',
        '${user.password}'
    )`
    query(Query, cb, err)
}

/**
 * @param {{email: string}} filter 
 * @param {function(Usuario)} cb - called on success
 * @param {function(error)} err - called on error
 */
const findUser = (filter, cb, err) => {
    let Query = `select * from Usuario where(
        email='${filter.email}'
    )`
    query(Query, res => {
        let user = null
        if (res['recordset']) {
            let set = res['recordset'][0]
            if (set) {
                user = new Usuario(
                    set['username'],
                    set['email'],
                    set['password']
                )
                user.password = set['password']
            } else return err()
        }
        cb(user)
    }, err)
}

/**
 * @param {{email: string}} filter
 * @param {Usuario} user - new values to update
 * @param {function(Usuario)} cb - called on success
 * @param {function(error)} err - called on error
 */
const updateUser = (filter, user, cb, err) => {
    let Query = `update Usuario set
        username='${user.username}',
        password='${user.password}'
        where email='${user.email}'
    `
    query(Query, cb, err)
}









//      Funções Faixa


/**
 * @param {function(Faixa[])} cb 
 * @param {function(error) err 
 */
const getFaixas = (cb, err) => {
    let Query = 'select * from Faixas'
    query(Query, res => {
        let Query2 = 'select * from Faixa_Compositor'
        query(Query2, res2 => {
            let compositores = {}
            for (let index in res2['recordset']) {
                let set = res2['recordset'][index]
                let ca = set['cod_album']
                let pos = set['posicao']
                let cc = set['cod_comp']

                if (!compositores[ca]) compositores[ca] = {}
                if (!compositores[ca][pos]) compositores[ca][pos] = []
                compositores[ca][pos] = compositores[ca][pos].concat(cc)
            }
            let faixas = []
            for (let index in res['recordset']) {
                let set = res['recordset'][index]
                let faixa = new Faixa(
                    set['link'],
                    set['nome'],
                    set['duracao'],
                    set['posicao'],
                    set['cod_album'],
                    set['descricao'],
                    set['vezes_tocada'],
                    set['tipo_gravacao'],
                    set['tipo_composicao'],
                )
                faixa.id_compositores = compositores[faixa.cod_album][faixa.posicao]
                faixas = faixas.concat(faixa)
            }
            cb(faixas)
        })
    }, err)
}


/**
 * @param {Faixa} faixa
 * @param {function()} cb 
 * @param {function(error) err 
 */
const addFaixa = (faixa, cb, err) => {
    let Query = `insert into Faixas (
        link,
        nome,
        duracao,
        posicao,
        id_album,
        descricao,
        vezes_tocada,
        tipo_gravacao,
        tipo_composicao
    )values(
        ${faixa.link},
        '${faixa.nome}',
        ${faixa.duracao},
        ${faixa.posicao},
        ${faixa.cod_album},
        '${faixa.descricao}',
        ${faixa.vezes_tocada},
        ${faixa.tipo_gravacao},
        ${faixa.tipo_composicao}
    )`
    query(Query, () => {
        for (let index in faixa.id_compositores) {
            let Query2 = `insert into Faixa_Compositor values (
                ${faixa.cod_album},
                ${faixa.posicao},
                ${faixa.id_compositores[index]}
            )`
            query(Query2, () => { }, err)
        }
        cb()
    }, err)
}


/**
 * @param {number} posicao
 * @param {number} cod_album
 * @param {function()} cb
 * @param {function(error) err
 */
const removeFaixa = (posicao, cod_album, cb, err) => {
    let Query = `delete from Faixa_Compositor where
        cod_album=${cod_album} and
        posicao=${posicao}
    `
    query(Query, () => {
        let Query2 = `delete from Faixas where
            cod_album=${cod_album} and
            posicao=${posicao}
        `
        query(Query2, cb, err)
    }, err)
}





//      Funções Playlist


/**
 * @param {Playlist} playlist
 * @param {function()} cb 
 * @param {function(error) err 
 */
const addPlaylist = (playlist, cb, err) => {
    let Query = `insert into Playlist values(
        ${playlist.id},
        '${playlist.nome}',
        ${playlist.tempo_exec},
        ${playlist.data_criacao}
    )`
    query(Query, () => {
        Object.keys(playlist.id_faixas).map(cod_album => {
            playlist.id_faixas[cod_album].map(posicao => {
                let Query2 = `insert into Faixa_Playlist values(
                    ${cod_album},
                    ${posicao},
                    ${playlist.id},
                    ${Date.now()},
                    0
                )`
                query(Query2, cb, err)
            })
        })
    }, err)
}


/**
 * @param {function(Playlist[])} cb 
 * @param {function(error) err 
 */
const getPlayLists = (cb, err) => {
    let Query = `select * from Playlist`
    query(Query, res => {
        let Query2 = `select * from Faixa_Playlist`
        query(Query2, res2 => {
            let Playlists = []
            let Faixas = {}
            res2['recordset'].map(set => {
                let idp = set['id_playlist']
                let ca = set['cod_album']
                let pos = set['posicao']

                if (!Faixas[idp]) Faixas[idp] = {}
                if (!Faixas[idp][ca]) Faixas[idp][ca] = []
                Faixas[idp][ca] = Faixas[idp][ca].concat(pos)
            })
            console.log(Faixas)
            res['recordset'].map(set => {
                let pl = new Playlist(
                    set['id'],
                    set['nome'],
                    set['tempo_exec'],
                    set['data_criacao']
                )
                pl.id_faixas = Faixas[pl.id]
                Playlists = Playlists.concat(pl)
            })
            cb(Playlists)
        }, err)
    }, err)
}


/**
 * @param {number} id
 * @param {function(Playlist)} cb 
 * @param {function(error) err
 */
const findPlayList = (id, cb, err) => {
    getPlayLists(Playlists=>{
        cb(Playlists.find(x=> x['id'] == id))
    }, err)
}


/**
 * @param {number} id
 * @param {function()} cb 
 * @param {function(error) err 
 */
const removePlayList = (id, cb, err) => {
    let Query = `delete from Faixa_Playlist where
        id_playlist=${id}
    `
    query(Query, () => {
        let Query2 = `delete from Playlist where
            id=${id}
        `
        query(Query2, cb, err)
    }, err)
}


/**
 * @param {Faixa} faixa
 * @param {Playlist} pl
 * @param {function()} cb 
 * @param {function(error) err 
 */
 const insertFaixaPlayList = (faixa, pl, cb, err) => {
    let Query = `update Playlist
        set
            tempo_exec=${pl.tempo_exec},
        where
            id_playlist=${pl.id}
    `
    query(Query, () => {
        if(!pl.id_faixas[faixa.cod_album]) pl.id_faixas[faixa.cod_album] = []
        pl.id_faixas[faixa.cod_album] = pl.id_faixas[faixa.cod_album].concat(faixa.id)
        let Query2 = `insert into Faixa_Playlist values(
            ${cod_album},
            ${posicao},
            ${playlist.id},
            ${Date.now()},
            0
        )`
        query(Query2, cb, err)
    }, err)
}


/**
 * @param {Faixa} faixa
 * @param {Playlist} pl
 * @param {function()} cb 
 * @param {function(error) err 
 */
 const removeFaixaPlayList = (faixa, pl, cb, err) => {
    let Query = `update Playlist
        set
            tempo_exec=${pl.tempo_exec},
        where
            id_playlist=${pl.id}
    `
    query(Query, () => {
        if(!pl.id_faixas[faixa.cod_album]) pl.id_faixas[faixa.cod_album] = []
        pl.id_faixas[faixa.cod_album] = pl.id_faixas[faixa.cod_album].filter(x=> x != faixa.id)
        let Query2 = `delete from Faixa_Playlist where
            id_playlist=${pl.id} and
            cod_album=${faixa.cod_album} and
            posicao=${faixa.posicao}
        )`
        query(Query2, cb, err)
    }, err)
}





//      Album

/**
 * @param {number} id
 * @param {function(Album)} cb
 * @param {function(error)} err
 */
const findAlbum = (id, cb, err) => {
    let Query = `select * from Albuns where
        cod=${id}
    `
    query(Query, res=>{
        let set = res['recordset']
        let album = new Album(
            set['id'],
            set['nome'],
            set['id_gravadora'],
            set['tipo_compra'],
            set['descricao'],
            set['data_gravacao'],
            set['data_compra'],
            set['preco_compra']
        )
        cb(album)
    }, err)
}



export {
    sql,
    query,
    addUser,
    addFaixa,
    findUser,
    getFaixas,
    findAlbum,
    updateUser,
    removeFaixa,
    addPlaylist,
    getPlayLists,
    findPlayList,
    removePlayList,
    insertFaixaPlayList,
    removeFaixaPlayList,
}