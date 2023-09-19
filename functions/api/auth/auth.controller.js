const authService = require('./auth.service');


async function login(req, res,next) {
    const { username, password } = req.body    
    try {
        const user = await authService.login(username, password);
        // req.session.user = user[0]; no need , i'm using the sessionStorage.
        res.send(user[0]);
    } catch (err) {
        res.status(401).send({ error: err })
    }
}


module.exports = {
    login,
    
}