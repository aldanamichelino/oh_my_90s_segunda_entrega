const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { UserService } = require('../services/users/users.service');
const { write } = require('../winston/logger.config');
require('dotenv').config();
const { sendNotification } = require('../notifications/nodemailer.config');
const UserDTO = require('../models/dtos/User.dto');
const { STATUS } = require('../constants/api');
const { ADMIN_EMAIL } = require('../config'); 

const userService = new UserService;

const salt = async() => await bcrypt.genSalt(10);
const createHash = async(password) => await bcrypt.hash(password, parseInt(salt()));
const isValidPassword = async (user, password) => await bcrypt.compare(password, user.password);


//Passport local strategy
passport.use('login', new LocalStrategy({
    usernameField : 'email'
}, 
async (email, password, done) => {
    try{
        const user = await userService.getUserByEmail(email);
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
        const { name, address, age, phone, repassword } = req.body;
        if(!name || !address || !age || !phone || !password || !repassword){
          write('error', 'Por favor, complete todos los campos'); 
          return new Error(`${STATUS.BAD_REQUEST.tag}, code: ${STATUS.BAD_REQUEST.code}, Por favor, complete todos los campos`);
        } else if(password != repassword){
          write('error', 'Las contraseñas no coinciden'); 
          throw new Error(`${STATUS.BAD_REQUEST.tag}, code: ${STATUS.BAD_REQUEST.code}, Las contraseñas no coinciden`);
        } else {
            try{
                const userObject = {
                    email: email,
                    password: await createHash(password),
                    name: name,
                    address: address,
                    age: age,
                    phone: phone,
                    avatar: req.file,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
    
                const newUser = new UserDTO(userObject);
    
                const user = await userService.createUser(newUser);
    
                //new user notification to admin 
                const mailOptions = {
                    from: "Tienda Sweet 90's",
                    to: ADMIN_EMAIL,
                    subject: "Nuevx usuarix registradx",
                    html: `<div>
                                <h2>Se ha registrado unx nuevx usuarix</h2>
                                <br>
                                <ul>
                                    <li>Nombre: ${name}</li>
                                    <li>Email: ${email}</li>
                                    <li>Dirección: ${address}</li>
                                    <li>Whatsapp: ${phone}</li>
                                    <li>Edad: ${age}</li>
                                </ul>
                            </div>`
                };
    
                sendNotification(mailOptions);
    
                return done(null, user);
            } catch(error) {
                write('error', 'Error al registrarte');
                return done(error);
            };
        }
    }
));


// Serialización
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialización
passport.deserializeUser(async (id, done) => {
    const user = await userService.getUserById(id);
    done(null, user);
});

module.exports = passport;