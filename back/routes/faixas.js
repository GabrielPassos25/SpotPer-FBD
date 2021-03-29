
import Express from 'express'
import { findFaixa } from '../db/db.js'
import { Faixa } from './../db/models.js'


// findFaixa({}, faixas=>console.log(faixas), err=>console.log("Error:\n", err.originalError.info.message))

/**
 * @param {Express.Express} app
 */
export default app=> {
    app.get('/faixa', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let body = req.body
        findFaixa(body['filter'], faixas=>{
            response.body['faixas'] = faixas
            res.json(response)
        }, err=>{
            response.message = "Internal Error"
            res.json(response)
        })
    })

    app.post('/faixa', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let body = req.body
        
    })
}