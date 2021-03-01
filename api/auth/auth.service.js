const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(username, password) {

    logger.debug(`auth.service - login: ${username}`);
    try{
        if (!username || !password) return Promise.reject('Username and password are required!');
        const user = await userService.getUser();
        if (user[0].username !== username) return Promise.reject('Invalid username');
        const match = await bcrypt.compareSync(password, user[0].password);
        if (!match){ 
            return Promise.reject('Invalid password')
        }
        delete user[0].password;
        return user;
    } catch(Err){
        console.log('cannot get user from mongoDB');
    }

   
}






module.exports = {
    login,

}