const functions = require("firebase-functions");

// my code:

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParse = require('cookie-parser');


const app = express();


app.use(cookieParse('keyboard cat'));
app.use(bodyParser.json());



if (process.env.NODE_ENV === 'production') {
    app.use(cors());
    app.use(express.static(path.resolve(__dirname, 'public')));

} else {
    
    const corsOptions = {
        origin: ['http://127.0.0.1:4200', 'http://localhost:4200' , 'http://127.0.0.1:4200' , 'http://localhost:4200' , "http://127.0.0.1:5001/zviafood-backend/us-central1"],
        credentials: true,
    };
    app.use(cors(corsOptions));
}


const recipeRoutes = require('./api/recipe/recipe.routes');
const authRoutes = require('./api/auth/auth.routes');

app.use('/api/recipe', recipeRoutes);
app.use('/api/auth', authRoutes);



exports.app = functions.https.onRequest(app);





