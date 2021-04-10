import Express from 'express'
import { Album } from './../db/models.js'
import { findAlbum } from '../db/db.js'


/**
 * @param {Express.Express} app
 */
 export default app=>{
    app.get('/album', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let body = req.body

        if(!body || !body.id){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            findAlbum(body.id, album=>{
                response.body = album
                res.json(response)
            }, err=>{
                response.message = "Álbum não encontrado!"
                res.json(response)
            })
        }
    })
 }