const dbService =  require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    remove,
    add,
    update

}

async function query(filterBy){
   const collection = await dbService.getCollection('recipe'); 
   var filter = {};
   if (filterBy) filter = { $or: [ { title: {$regex : `.*${filterBy}.*`} }, { labels: filterBy } ] }
   try {
       const recipes = await collection.find(filter).sort({ createdAt : -1 }).toArray();
       return recipes;
   } catch(err) {
       console.log('ERROR: cannot find recipes');
       throw err;
   }
}

async function getById(recipeId){
   const collection = await dbService.getCollection('recipe'); 
   
   try {
       const recipe = await collection.findOne({"_id":ObjectId(recipeId)}) ;
       return recipe;
   } catch(err) {
       console.log('ERROR: cannot find recipe');
       throw err;
   }
}

async function remove(recipeId){
   const collection = await dbService.getCollection('recipe'); 
   try {
        await collection.remove({"_id":ObjectId(recipeId)}) ;
   } catch(err) {
       console.log('ERROR: cannot remove recipe');
       throw err;
   }
}

async function add(recipe){
   const collection = await dbService.getCollection('recipe'); 
   try {
       await collection.insertOne(recipe);
   } catch(err) {
       console.log('ERROR: cannot add recipe');
       throw err;
   }
}

async function update(recipe){
   const collection = await dbService.getCollection('recipe'); 
   recipe._id = ObjectId(recipe._id);
   try {
       await collection.replaceOne({"_id":recipe._id}, {$set : recipe});
   } catch(err) {
       console.log('ERROR: cannot update recipe');
       throw err;
   }
}