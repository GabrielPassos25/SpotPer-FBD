
import Express from 'express'
import { Faixa } from './../db/models.js'
import { findFaixa, addFaixa, removeFaixa } from '../db/db.js'


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
        if(
            !body.link || !body.nome || !body.duracao ||
            !body.posicao || !body.codAlbum || !body.descricao ||
            !body.tipo_gravacao || !body.tipo_composicao
        ){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            let faixa = new Faixa(
                body.link,
                body.nome,
                body.duracao,
                body.posicao,
                body.codAlbum,
                body.descricao,
                body.tipo_gravacao,
                body.tipo_composicao
            )
            faixa.id_compositores = body.id_compositores
            addFaixa(faixa, ()=>{
                res.json(response)
            }, err=>{
                response.message = "Faixa already exists on current album and position"
                res.json(response)
            })
        }
    })

    app.delete('/faixa', (req, res)=>{
        const response = {
            message: 'Ok',
            body: {}
        }
        let body = req.body
        if(!body.codAlbum || !body.posicao){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            removeFaixa(body.posicao, body.codAlbum, ()=>{
                res.json(response)
            }, err=>{
                response.message = "Faixa not found"
                res.json(response)
            })
        }
    })
}