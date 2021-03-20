import Express from 'express'
import { Usuario } from '../db/models.js'
import { addUser, findUser } from '../db/db.js'


/**
 * @param {Express.Express} app
 */
export default app=> {
    app.get('/user', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let body = req.body
        if(!body || !body['username']){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            findUser({username: body['username']}, user=>{
                response.body['username'] = user.username
                response.body['email'] = user.email
                res.json(response)
            }, err=>{
                response.message = "User not found"
                res.json(response)
            })
        }
    })


    app.post('/login', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let body = req.body
        if(!body || !body['username'] || !body['password']){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            findUser({username: body['username']}, user=>{
                if(user.checkPassword(body['password'])){
                    response.body['username'] = user.user
                    response.body['email'] = user.email
                }else{
                    response.message = 'Invalid password'
                }
                res.json(response)
            }, err=>{
                response.message = "User not found"
                res.json(response)
            })
        }
    })


    app.post('/register', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let body = req.body
        if(!body || !body['username'] || !body['email'] || !body['password']){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            findUser({username: body['username']}, user=>{
                response.message = "User already registered"
                res.json(response)
            }, err=>{
                let user = new Usuario(
                    body['username'],
                    body['email'],
                    body['password']
                )
                addUser(user, ()=>{
                    response.body['username'] = user.user
                    response.body['email'] = user.email
                    res.json(response)
                }, err=>{
                    response.message("Internal Error")
                })
            })
        }
    })
}
