const express = require('express');
const router = express.Router();
const { Product } = require('../../models/daos/index');
const product = new Product;
const { write } = require('../../config');


const user = {
    isAdmin: true
};

//Middlewares
const isAdmin = (req, res, next) => {
    if(user.isAdmin){
        next();
    } else {
        write('error', `ruta ${req.originalUrl} método ${req.method} no autorizada`);
        res.status(403).json({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada`});  
    }
};

router.get('/', (req, res) => {
    const user = req.user;
    const { id } = req.query;
    if(id){
        if(id){
                product.getById(id)
                .then(response => {res.status(200).json({success: true, response: response})})
                .catch(error => {res.status(500).json({success: false, error: error.message})});
        } else {
            write('error', 'Por favor, ingrese un id válido');
            return res.status(400).json({success: false, response: 'Por favor, ingrese un id válido'});
        }
    } else {
        if(user) {
            product.getAll()
            .then(response => {res.render('main', {products: response, user: user, req: req})})
            .catch(error => {res.status(500).json({success: false, error: error.message})});
        } else {
            write('error', 'Sesión expirada');
            res.redirect('/');
        } 
    }
});

router.get('/salados', (req, res) => {
    const user = req.user;
    if(user){
        product.filterBy('sweet', false)
            .then(response => {res.render('main', {products: response, user: user, req: req})})
            .catch(error => {res.status(500).json({success: false, error: error.message})});
    } else {
        write('error', 'Sesión expirada');
        res.redirect('/');
    }
});

router.get('/dulces', (req, res) => {
    const user = req.user;
    if(user){
        product.filterBy('sweet', true)
        .then(response => {res.render('main', {products: response, user: user, req: req})})
        .catch(error => {res.status(500).json({success: false, error: error.message})});
    } else {
        write('error', 'Sesión expirada');
        res.redirect('/');
    }

});


router.post('/', isAdmin, (req, res) => {
    const { name, description, code, image, price, stock, sweet } = req.body;

    if(!name || !description || !code || !image || !price || !stock){
        return res.status(400).json({success: false, error: 'Ingrese todos los datos requeridos'});
    } else {
        const newProduct = {
            name,
            description,
            code,
            image,
            price,
            stock,
            sweet,
            timestamp: Date.now()
        };

        product.save(newProduct)
        .then(response => {res.status(200).json({success: true, response: response})})
        .catch(error => {res.status(500).json({success: false, error: error.message})});

    }
});


router.put('/:id', isAdmin, (req, res) => {
    const { params: {id}, body: {name, description, code, image, price, stock} } = req;

    if(!name || !description || !code || !image || !price || !stock){
        write('error', 'Ingrese todos los datos requeridos');
        return res.status(400).json({success: false, error: 'Ingrese todos los datos requeridos'});
    } else {
        if(id){
            const newProductData = {
                name,
                description,
                code,
                image,
                price,
                stock,
                timestamp: Date.now()
            };

            product.update(id, newProductData)
            .then(response => {res.status(200).json({success: true, response: response})})
            .catch(error => {res.status(500).json({success: false, error: error.message})});
                
        } else {
            write('error', 'Por favor, ingrese un id válido');
            return res.status(400).json({success: false, response: 'Por favor, ingrese un id válido'});
        }
    }
});


router.delete('/:id', isAdmin, (req, res) => {
    const { id } = req.params;
    
    if(id){
            product.delete(id)
                .then(response => {res.status(200).json({success: true, response: response})})
                .catch(error => {res.status(500).json({success: false, error: error.message})})
    } else {
        write('error', 'Por favor, ingrese un id válido');
        return res.status(400).json({success: false, response: 'Por favor, ingrese un id válido'});
    }
});

module.exports = router;