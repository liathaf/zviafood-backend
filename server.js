const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParse = require('cookie-parser');
const session = require('express-session');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const dbService = require('./services/db.service');

app.use(cookieParse('keyboard cat'));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: dbService.getSesstionStore(),
    cookie: { maxAge: 1000 * 60 * 60 * 2 , secure: false}
}));

if (process.env.NODE_ENV === 'production') {
    app.use(cors());
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    
    const corsOptions = {
        origin: ['http://127.0.0.1:4200', 'http://localhost:4200' , 'http://127.0.0.1:4000' , 'http://localhost:4000' , "https://zviacooking.co.il"],
        credentials: true,
    };
    app.use(cors(corsOptions));
}


const recipeRoutes = require('./api/recipe/recipe.routes');
const authRoutes = require('./api/auth/auth.routes');

app.use('/api/recipe', recipeRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3030;

app.get('*', function(req, res) {
    // res.sendFile(path.join(__dirname, 'public/index.html'));
    res.end()
    
});


app.listen(port, () => {
    console.log(`listening at port: ${port}`)
})

