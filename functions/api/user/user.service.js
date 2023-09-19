const dbService =  require('../../services/db.service');


module.exports = {
    getUser

}

async function getUser(){
   const collection = await dbService.getCollection('user');
   try {
        const user = await collection.find({}).toArray();
        return user;
   } catch(err) {
       console.log('ERROR: cannot find user');
       throw err;
   }
}


