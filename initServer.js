const initServer = () => {
    const express = require('express');
    const passport = require('./middlewares/passport');
    const apiRoutes = require('./routers/api.routes');
    const app = express();
    const { env: {PORT} } = require('./config');
    const MongoStore = require('connect-mongo');
    const session = require('express-session');
    const auth = require('./middlewares/auth');
    require('dotenv').config();
    const { write } = require('./config');


    //Middlewares
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
        name: 'some-session',
        secret: process.env.SESSION_SECRET,
        resave: false,
        rolling: true,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            dbName: 'sweetnineties'
        }),
        cookie: {
            // maxAge: 600000
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.set('views', './views');
    app.set('view engine', 'ejs');

    //Routes
    app.use('/api', apiRoutes);

    app.get('/', (req, res) => {
        const user = req.user;
        if(user) {
            return res.redirect('/api/productos');
        } else {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        } 
    });

    app.get('/logout', auth, async (req, res, next) => {
        req.logOut(function(err){
            if(err){return next(err)}
            req.session.destroy(err => {
                res.clearCookie('some-session');
                if (err) {
                    write('error', `${err}`);
                }
                else {
                    write('info', 'Usuario deslogueado');
                    res.redirect('/');
                }
            });
        });
    });

    app.get('*', function(req, res){
        write('error', `ruta ${req.originalUrl} método ${req.method} no implementada`);
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
    });


    //Port connection
    const connectedServer = app.listen(PORT, ()=> {
        write('info', `Server is up and running on port ${PORT}`);
    });
    
    connectedServer.on('error', (error) => {
        write('error', `${error}`);
    });
}

module.exports = {
    initServer
};