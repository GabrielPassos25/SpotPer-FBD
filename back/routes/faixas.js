
import Express from 'express'
import { Faixa } from './../db/models.js'
import { getFaixas, addFaixa, removeFaixa, insertFaixaPlayList, removeFaixaPlayList } from '../db/db.js'

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
        getFaixas(faixas=>{
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
            !body.posicao || !body.cod_album || !body.descricao ||
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
                body.cod_album,
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
        if(!body.cod_album || !body.posicao){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            removeFaixa(body.posicao, body.cod_album, ()=>{
                res.json(response)
            }, err=>{
                response.message = "Faixa not found"
                res.json(response)
            })
        }
    })

    app.post('/faixa_playlist', (req, res)=>{
        const response = {
            message: 'Ok',
            body: {}
        }
        let body = req.body
        if(!body || !body.faixa || !body.playlist){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            insertFaixaPlayList(body.faixa, body.playlist, cb=>{
                res.json(response)
            }, err=>{
                response.message = "Music already exists on playlist"
                res.json(response)
            })
        }
    })
    

    app.delete('/faixa_playlist', (req, res)=>{
        const response = {
            message: 'Ok',
            body: {}
        }
        let body = req.body
        if(!body || !body.faixa || !body.playlist){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            removeFaixaPlayList(body.faixa, body.playlist, cb=>{
                res.json(response)
            }, err=>{
                response.message = "Internal Error"
                res.json(response)
            })
        }
    })
}