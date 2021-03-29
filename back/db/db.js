import sql from 'mssql'
import config from './config.js'
import { Usuario, Faixa } from './models.js'


const onError = (err, cb)=> {
    if(err.code == 'ESOCKET'){
        console.log("\x1b[31mErro ao tentar se conectar com o banco!\x1b[0m")
        cb(err)
    }else cb(err)
}

/**
 * @param {String} query 
 * @param {function(*)} cb - called on success
 * @param {function(*)} err - called on error
 */
const query = (query, cb, err)=> {
    sql.connect(config).then(con=>{
        con.request().query(query).then(res=> {
            cb(res)
        }, ex=>onError(ex, err))
    }, ex=>onError(ex, err))
}

/**
 * @param {Usuario} user 
 * @param {function(*)} cb - called on success
 * @param {function(*)} err - called on error
 */
const addUser = (user, cb, err)=> {
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
const findUser = (filter, cb, err)=>{
    let Query = `select * from Usuario where(
        email='${filter.email}'
    )`
    query(Query, res=>{
        let user = null
        if(res['recordset']){
            let set  = res['recordset'][0]
            if(set){
                user = new Usuario(
                    set['username'],
                    set['email'],
                    set['password']
                )
                user.password = set['password']
            }else return err()
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
const updateUser = (filter, user, cb, err)=>{
    let Query = `update Usuario set
        username='${user.username}',
        password='${user.password}'
        where email='${user.email}'
    `
    query(Query, cb, err)
}







//      Funções Faixa


/**
 * @param {{}} 
 * @param {function(Faixa[])} cb 
 * @param {function(error) err 
 */
const findFaixa = (filter, cb, err)=>{
    let Query = 'select * from Faixa'
    if(filter && JSON.stringify(filter) != JSON.stringify({})){
        Query += ' where'
        Object.keys(filter).map(key=> Query += ` ${key}='${filter[key]}'`)
    }
    query(Query, res=>{
        let faixas = []
        for(let index in res['recordset']){
            let set  = res['recordset'][index]
            faixas.concat(
                new Faixa(
                    set['id'],
                    set['url'],
                    set['nome'],
                    set['posicao'],
                    set['artista'],
                    set['id_album'],
                    set['descricao'],
                    set['vezes_tocada'],
                    set['id_compositor'],
                    set['tipo_gravacao'],
                    set['tempo_execucao'],
                    set['tipo_composicao'],
                )
            )
        }
        cb(faixas)
    }, err)
}


/**
 * @param {Faixa} faixa
 * @param {function(Faixa[])} cb 
 * @param {function(error) err 
 */
const addFaixa = (faixa, cb, err)=>{
    let Query = `insert into Faixa (
        id,
        url,
        nome,
        posicao,
        artista,
        id_album,
        descricao,
        vezes_tocada,
        id_compositor,
        tipo_gravacao,
        tempo_execucao,
        tipo_composicao
    )values(
        ${faixa.id},
        ${faixa.url},
        ${faixa.nome},
        ${faixa.posicao},
        ${faixa.artista},
        ${faixa.id_album},
        ${faixa.descricao},
        ${faixa.vezes_tocada},
        ${faixa.id_compositor},
        ${faixa.tipo_gravacao},
        ${faixa.tempo_execucao},
        ${faixa.tipo_composicao}
    )`
}


export {
    sql,
    query,
    addUser,
    findUser,
    findFaixa,
    updateUser,
}