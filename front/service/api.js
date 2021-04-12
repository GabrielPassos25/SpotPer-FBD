import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

const error = err => {
    alert("Erro ao tentar se conectar com a API!")
    console.log(err)
}
const response = (res, cb) => {
    cb(res.data)
}




const postLogin = (email, password, cb) => {
    api.post('login', {
        email: email,
        password: password
    }).then(res => response(res, cb), error)
}

const getUser = (email, cb) => {
    api.get('user', { email: email }).then(res => response(res, cb), error)
}

const registerUser = (email, username, password, cb) => {
    api.post('register', {
        email: email,
        username: username,
        password: password
    }).then(res => response(res, cb), error)
}

const sendResetRequest = (email, cb) => {
    api.post('reset', {
        email: email
    }).then(res => response(res, cb), error)
}

const sendResetPassword = (email, token, password, cb) => {
    api.put(`reset/${email}/${token}`, {
        password: password
    }).then(res => response(res, cb), error)
}

const getFaixas = (cb) => {
    api.get('faixa').then(res => response(res, cb), error)
}

const getPlaylists = (cb) => {
    api.get('playlist').then(res => response(res, cb), error)
}

const removePlaylist = (id, cb) => {
    api.delete('playlist', { 
        data:{
            id: id
        }
    }).then(res => response(res, cb), error)
}

const getAlbum = (cb) => {
    api.get('album').then(res => response(res, cb), error)
}

const addPlaylist = (playlist, cb) => {
    api.post('playlist', playlist).then(res=> response(res, cb), error)
}

const add_faixa_into_playlist = (faixa, playlist, cb) => {
    playlist.tempo_exec += faixa.duracao
    api.post('faixa_playlist', {
        faixa: faixa,
        playlist: playlist
    }).then(res => response(res, cb), error)
}

const remove_faixa_from_playlist = (faixa, playlist, cb) => {
    playlist.tempo_exec -= faixa.duracao
    if(playlist.tempo_exec == 0){
        alert("Playlist não pode ficar vazia!")
        return;
    }
    api.delete('faixa_playlist', {
        data: {
            faixa: faixa,
            playlist: playlist
        }
    }).then(res => response(res, cb), error)
}

export {
    api,
    getUser,
    getAlbum,
    getFaixas,
    postLogin,
    addPlaylist,
    getPlaylists,
    registerUser,
    removePlaylist,
    sendResetRequest,
    sendResetPassword,
    add_faixa_into_playlist,
    remove_faixa_from_playlist
}