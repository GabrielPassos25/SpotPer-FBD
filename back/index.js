import cors from 'cors'
import Express from 'express'
import bodyParser from 'body-parser'
import { sendEmail } from './mail/mail.js'
import routesRegister from './routes/routesRegister.js'

const app = Express()
app.listen(3000)


app.use(bodyParser.json())
app.use(cors())


routesRegister(app)
