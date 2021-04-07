import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

const error = err=>{
    alert("Erro ao tentar se conectar com a API!")
    console.log(err)
}
const response = (res, cb)=>{
    cb(res.data)
}




const postLogin = (email, password, cb)=>{
    api.post('login', {
        email: email,
        password: password
    }).then(res=>response(res, cb), error)
}

const getUser = (email, cb)=>{
    api.get('user', {email: email}).then(res=>response(res, cb), error)
}

const registerUser = (email, username, password, cb)=>{
    api.post('register', {
        email: email,
        username: username,
        password: password
    }).then(res=>response(res, cb), error)
}

const sendResetRequest = (email, cb)=>{
    api.post('reset', {
        email: email
    }).then(res=>response(res, cb), error)
}

const sendResetPassword = (email, token, password, cb)=>{
    api.put(`reset/${email}/${token}`, {
        password: password
    }).then(res=>response(res, cb), error)
}

export {
    api,
    getUser,
    postLogin,
    registerUser,
    sendResetPassword,
    sendResetRequest,
}