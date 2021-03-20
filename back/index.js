import HTTP from 'http'
import Express from 'express'
import routesRegister from './routes/routesRegister.js'
import bodyParser from 'body-parser'

const app = Express()
const http = HTTP.createServer(app)
app.use(bodyParser.json())
routesRegister(app)


app.get('/test', (req, res)=>{
    res.json({
        "message": "this is a json!"
    })
})


// import { addUser, findUser } from './db/db.js'
// import { Usuario } from './db/models.js'
// let user = new Usuario('user', 'email@gmail.com', 'password')
// addUser(user, res=> console.log(res), err=> console.log(err))
// addUser(user)
// findUser({username: user.username}, user=> console.log(user), err=> console.log(err))









http.listen(process.env.PORT || 3000)
