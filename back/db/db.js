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
    let Query = 'select * from Faixas'
    if(filter && JSON.stringify(filter) != JSON.stringify({})){
        Query += ' where'
        Object.keys(filter).map(key=> Query += ` ${key}='${filter[key]}'`)
    }
    query(Query, res=>{
        let Query2 = 'select * from Faixa_Compositor'
        query(Query2, res2=>{
            let compositores = {}
            for(let index in res2['recordset']){
                let set = res2['recordset'][index]
                let ca = set['codAlbum']
                let pos = set['posicao']
                let cc = set['codComp']
                
                if(!compositores[ca]) compositores[ca] = {}
                if(!compositores[ca][pos]) compositores[ca][pos] = []
                compositores[ca][pos] = compositores[ca][pos].concat(cc)
            }
        
            let faixas = []
            for(let index in res['recordset']){
                let set  = res['recordset'][index]
                let faixa = new Faixa(
                    set['codAlbum'],
                    set['posicao'],
                    set['tipo_composicao'],
                    set['tipo_gravacao'],
                    set['duracao'],
                    set['descricao'],
                    set['nome'],
                    set['link'],
                )
                faixa.id_compositores = compositores[faixa.codAlbum][faixa.posicao]
                faixas.concat(faixa)
            }
            cb(faixas)
        })
    }, err)
}


/**
 * @param {Faixa} faixa
 * @param {function(Faixa[])} cb 
 * @param {function(error) err 
 */
const addFaixa = (faixa, cb, err)=>{
    let Query = `insert into Faixas (
        link,
        nome,
        duracao,
        posicao,
        id_album,
        descricao,
        tipo_gravacao,
        tipo_composicao
    )values(
        ${faixa.link},
        ${faixa.nome},
        ${faixa.duracao},
        ${faixa.posicao},
        ${faixa.codAlbum},
        ${faixa.descricao},
        ${faixa.tipo_gravacao},
        ${faixa.tipo_composicao}
    )`
    query(Query, ()=>{
        for(let index in faixa.id_compositores){
            let Query2 = `insert into Faixa_Compositor values (
                ${faixa.codAlbum},
                ${faixa.posicao},
                ${faixa.id_compositores[index]}
            )`
            query(Query2, ()=>{}, err)
        }
        cb()
    }, err)
}


/**
 * @param {number} posicao
 * @param {number} codAlbum
 * @param {function(Faixa[])} cb
 * @param {function(error) err
 */
const removeFaixa = (posicao, codAlbum, cb, err)=>{
    let Query = `delete from Faixa_Compositor where
        codAlbum=${codAlbum} and
        posicao=${posicao}
    `
    query(Query, ()=>{
        let Query2 = `delete from Faixas where
            codAlbum=${codAlbum} and
            posicao=${posicao}
        `
        query(Query2, cb, err)
    }, err)
}


export {
    sql,
    query,
    addUser,
    findUser,
    findFaixa,
    updateUser,
    removeFaixa,
}