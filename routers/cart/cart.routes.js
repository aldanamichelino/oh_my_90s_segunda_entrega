const express = require('express');
const router = express.Router();
const { Carrito, Producto } = require('../../models/daos/index');
const carrito = new Carrito;
const producto = new Producto;

// const { Cart } = require('../../models/Cart');
// const cart = new Cart();


router.get('/:id/productos', (req, res) => {
    const { id } = req.params;
    if(id){
        carrito.getById(id)
            .then(response => {res.status(200).json({success: true, response: response})})
            .catch(error => {res.status(500).json({success: false, error: error.message})})

        } else {
            return res.status(400).json({success: false, response: 'Por favor, ingrese un id válido'});
        }
});


router.post('/', (req, res) => {
    const newCart = {
        products : []
    };

    carrito.save(newCart)
        .then(response => {res.status(200).json({success: true, response: response})})
        .catch(error => {res.status(500).json({success: false, error: error.message})});


});

//modificar esta ruta para adaptarse al dao
router.post('/:id/productos', async (req, res) => {
    const { params: { id }, body: { productId } } = req;

    if(!productId){
        return res.status(400).json({success: false, error: 'Por favor, elija un producto'});
    } else {

        const existingProduct = await producto.getById(productId);
        const existingCart = await carrito.getById(id);
        const cartProducts = existingCart.products;

        cartProducts.push(existingProduct);

        if(existingProduct){
            if(existingCart){
                carrito.update(id, {products: cartProducts})
                .then(response => {res.status(200).json({success: true, response: response})})
                .catch(error => {res.status(500).json({success: false, error: error.message})});
            }

        } else {
            return res.status(400).json({success: false, response: 'Producto no encontrado'});
        }

    }
});


router.delete('/:id', (req, res) =>{
    const { id } = req.params;

    if(id){
        carrito.delete(id)
            .then(response => {res.status(200).json({success: true, response: response})})
            .catch(error => {res.status(500).json({success: false, error: error.message})});

    } else {
        return res.status(400).json({success: false, response: 'Por favor, ingrese un id válido'});
    }
});

//modificar esta ruta para adaptarse al dao
router.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;

    if(!id_prod){
        return res.status(400).json({success: false, error: 'Por favor, elija un producto'});
    } else {

        const existingProduct = await producto.getById(id_prod);
        const existingCart = await carrito.getById(id);
        const cartProducts = existingCart.products;

        if(existingProduct){
            if(existingCart){
                let producto = cartProducts.find(product => product.id == id_prod);
                console.log(producto);

                carrito.update(id, {products: cartProducts})
                .then(response => {res.status(200).json({success: true, response: response})})
                .catch(error => {res.status(500).json({success: false, error: error.message})});
            }

        } else {
            return res.status(400).json({success: false, response: 'Producto no encontrado'});
        }

    }
});

module.exports = router;