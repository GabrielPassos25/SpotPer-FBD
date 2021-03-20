import HTTP from 'http'
import Express from 'express'
import bodyParser from 'body-parser'
import routesRegister from './routes/routesRegister.js'
import { sendEmail } from './mail/mail.js'

const app = Express()
const http = HTTP.createServer(app)
app.use(bodyParser.json())
routesRegister(app)



http.listen(process.env.PORT || 3000)
