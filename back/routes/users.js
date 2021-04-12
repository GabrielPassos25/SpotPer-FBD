import Express from 'express'
import { v4 as uuid4 } from 'uuid'
import { Usuario } from '../db/models.js'
import { sendEmail } from '../mail/mail.js'
import { addUser, findUser, updateUser } from '../db/db.js'


const resets = {}


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
        if(!body || !body['email']){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            findUser({email: body['email']}, user=>{
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
        if(!body || !body['email'] || !body['password']){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            findUser({email: body['email']}, user=>{
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
                response.message = "User already registered"
                res.json(response)
            })
        }
    })

    app.post('/reset', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let body = req.body
        if(!body || !body['email']){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            findUser({email: body['email']}, user=>{
                let token = uuid4()
                let url = `http://localhost:19006/reset/${body['email']}/${token}`
                sendEmail([body['email']], 'Solicitação de reset da senha', {'{{ url }}': url})
                resets[body['email']] = token
                response.body['token'] = token
                response.body['url'] = url
                res.json(response)
            }, err=>{
                response.message = "User not found"
                res.json(response)
            })
        }
    })
    
    app.put('/reset/:email/:token', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let email = req.params.email
        let token = req.params.token
        let body = req.body
        if(!email || !token || resets[email] != token){
            response.message = "Invalid email or token"
            res.json(response)
        }else if(!body || !body['password']){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            delete resets[email]
            findUser({email: email}, user=>{
                user.setPassword(body['password'])
                updateUser({email: email}, user, ()=>{
                    response.body['username'] = user.user
                    response.body['email'] = user.email
                    res.json(response)
                })
            }, err=>{
                response.message = "User not found"
                res.json(response)
            })
        }
    })
}
