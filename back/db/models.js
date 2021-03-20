import bcrypt from 'bcrypt'

class Usuario{
    /**
     * @param {string} username 
     * @param {string} email 
     * @param {string} password 
     */
    constructor(username, email, password){
        this.username = username
        this.email = email
        this.password = String(bcrypt.hashSync(password, 10))
    }

    /**
     * @param {string} password 
     * @returns {boolean}
     */
    checkPassword(password){
        return bcrypt.compareSync(password, this.password)
    }
}

export {
    Usuario
}