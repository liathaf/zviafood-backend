const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

const session = require('express-session');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session);

module.exports = {
    getCollection,
    getSesstionStore
}

/// Database name 
const dbName = 'recipe_db';

var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect();
    return db.collection(collectionName)

}

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect( config.dbURL, {useNewUrlParser: true , useUnifiedTopology: true});
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch(err) {
        console.log('Cannot Connect to DB' , err);
        throw err;
    }
}

function getSesstionStore(){

    const url = `${config.dbURL}/${dbName}`
    const connection = mongoose.createConnection(url ,{useNewUrlParser: true, useUnifiedTopology:true});
    const sesstionStore = new MongoStore({
            mongooseConnection: connection,
            collection: 'session' 
    });
    return sesstionStore;
} 