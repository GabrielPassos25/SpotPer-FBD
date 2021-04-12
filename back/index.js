import cors from 'cors'
import Express from 'express'
import bodyParser from 'body-parser'
import { sendEmail } from './mail/mail.js'
import routesRegister from './routes/routesRegister.js'
// import {findFaixa, getPlayLists} from './db/db.js'

const app = Express()
app.listen(3000)


app.use(bodyParser.json())
app.use(cors())


routesRegister(app)

// findFaixa({},faixas => console.log(JSON.stringify(faixas)), erro =>console.log(erro))
//getPlayLists(playlists => console.log(playlists), erro=>console.log(erro))