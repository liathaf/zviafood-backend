const authService = require('./auth.service');
const logger = require('../../services/logger.service')


async function login(req, res,next) {
    const { username, password } = req.body    
    try {
        const user = await authService.login(username, password);
        req.session.user = user[0];
        res.send(user[0]);
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

module.exports = {
    login,
    
}