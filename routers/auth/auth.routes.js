const express = require('express');
const authControllers = require('../../controllers/auth/auth.controller');
const passport = require('../../middlewares/passport');
const router = express.Router();

//Multer config
const multer = require('multer');
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {cb(null, 'public/uploads')},
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
    }
});


//Middlewares
const upload = multer({storage});

router.post(
    '/register',
    upload.single('avatar'),
    passport.authenticate('register', {failureRedirect: '/register', failureMessage: true}),
    authControllers.register
);

router.post(
    '/login',
    passport.authenticate('login', {failureRedirect: '/login', failureMessage: true}),
    authControllers.login
)

module.exports = router;