import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import config from './config.js'
import nodemailer from 'nodemailer'

const sender = nodemailer.createTransport(config)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8')

/**
 * @param {[string]} to
 * @param {string} subject
 * @param {{}} replaces
 */
 const sendEmail = (to, subject, replaces={})=>{
    let body = template + ''
    Object.keys(replaces).forEach(key=> body = body.replace(key, replaces[key]))
    const email = {
        from: config.auth.user,
        to: to.join(', '),
        subject: config.subject + subject,
        html: body
    }

    sender.sendMail(email)
}

export {
    sendEmail
}