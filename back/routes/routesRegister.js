import Express from 'express'
import registerUserRoutes from './users.js'
import registerFaixaRoutes from './faixas.js'


/**
 * @param {Express.Express} app
 */
export default app=> {
    registerUserRoutes(app)
    registerFaixaRoutes(app)
}