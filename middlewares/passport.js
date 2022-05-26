const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserDao = require('../models/daos/users/UserDaoMongo');
const User = new UserDao();
const { write } = require('../config');


const salt = async() => await bcrypt.genSalt(10);
const createHash = async(password) => await bcrypt.hash(password, parseInt(salt()));
const isValidPassword = async (user, password) => await bcrypt.compare(password, user.password);


//Passport local strategy
passport.use('login', new LocalStrategy({
    usernameField : 'email'
}, 
async (email, password, done) => {
    try{
        const user = await User.getByEmail(email);
        const validPassword = await isValidPassword(user, password);
        if(!validPassword){
            write('error', 'Usuario o contraseña inválidos');       
            return done(null, false);
        }
        return done(null, user);
    } catch(error) {
        return done(error);
    };
}));


passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    async (req, email, password, done) => {
       try{
            const userObject = {
                email: email,
                password: await createHash(password),
                name: req.body.name,
                address: req.body.address,
                age: req.body.age,
                phone: req.body.phone,
                avatar: req.file,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const user = await User.createUser(userObject);
            return done(null, user);
       } catch(error) {
            write('error', 'Error al registrarte');
            return done(error);
       };
    }
));


// Serialización
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialización
passport.deserializeUser(async (id, done) => {
    const user = await User.getById(id);
    done(null, user);
});

module.exports = passport;