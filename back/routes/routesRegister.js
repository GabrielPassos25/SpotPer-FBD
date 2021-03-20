import registerUserRoutes from './users.js'


/**
 * @param {Express.Express} app
 */
export default app=> {
    registerUserRoutes(app)
}