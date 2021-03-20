import sql from 'mssql'
import config from './config.js'
import { Usuario } from './models.js'


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
            con.close()
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
        '${user.username}',
        '${user.email}',
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
            user = new Usuario(
                set['username'],
                set['email'],
                set['password']
            )
            user.password = set['password']
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


export {
    sql,
    query,
    addUser,
    findUser,
    updateUser
}