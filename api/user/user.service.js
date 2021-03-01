const dbService =  require('../../services/db.service');


module.exports = {
    getUser

}

async function getUser(){
   const collection = await dbService.getCollection('user');
   try {
        const user = await collection.find({}).toArray();
        console.log('at user service');
        return user;
   } catch(err) {
    console.log('at user service');
       console.log('ERROR: cannot find user');
       throw err;
   }
}


