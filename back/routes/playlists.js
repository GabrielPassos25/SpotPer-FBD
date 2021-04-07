
import Express from 'express'
import { Playlist } from './../db/models.js'
import { getPlayLists, addPlaylist, removePlayList } from '../db/db.js'


/**
 * @param {Express.Express} app
 */
export default app=>{
    app.get('/playlist', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let body = req.body

        getPlayLists(playlists=>{
            response.body['Playlists'] = playlists
            res.json(response)
        }, err=>{
            response.message = "Internal Error!"
            res.json(response)
        })
    })

    app.post('/playlist', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let body = req.body

        if(
            !body ||
            !body.id ||
            !body.nome ||
            !body.tempoExec ||
            !body.data_criacao ||
            !body.id_faixas
        ){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            let pl = new Playlist(
                body.id,
                body.nome,
                body.tempoExec,
                body.data_criacao
            )
            pl.id_faixas = body.id_faixas
            addPlaylist(pl, ()=>res.json(response), err=>{
                response.message = "This Playlist ID already exists!"
                res.json(response)
            })
        }
    })

    app.delete('/playlist', (req, res)=>{
        const response = {
            message: "Ok",
            body: {}
        }
        let body = req.body
        
        if(!body || !body.id){
            response.message = "Invalid JSON"
            res.json(response)
        }else{
            removePlayList(body.id, ()=>res.json(response), err=>{
                response.message = "Playlist not found"
                res.json(response)
            })
        }
    })
}