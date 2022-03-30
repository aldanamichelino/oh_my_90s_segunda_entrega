const express = require('express');
const router = express.Router();
const { Carrito, Producto } = require('../../models/daos/index');
const carrito = new Carrito;
const producto = new Producto;

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


router.post('/:id/productos', async (req, res) => {
    const { params: { id }, body: { productId } } = req;

    if(!productId){
        return res.status(400).json({success: false, error: 'Por favor, elija un producto'});
    } else {

        const existingCart = await carrito.getById(id);
        const existingProduct = await producto.getById(productId);
        
        if(existingCart){
            const cartProducts = existingCart.products;
            
            if(existingProduct){
                existingProduct.id = productId;
                cartProducts.push(existingProduct);

                carrito.update(id, {products: cartProducts})
                .then(response => {res.status(200).json({success: true, response: response})})
                .catch(error => {res.status(500).json({success: false, error: error.message})});
            } else {
                return res.status(400).json({success: false, response: 'Producto no encontrado'});
            }

        } else {
            return res.status(400).json({success: false, response: 'Carrito no encontrado'});
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


router.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;

    if(!id_prod){
        return res.status(400).json({success: false, error: 'Por favor, elija un producto'});
    } else {

        const existingCart = await carrito.getById(id);
        
        if(existingCart){
            const cartProducts = existingCart.products;
            let productInCart = cartProducts.findIndex(product => product.id == id_prod);
            
            if(productInCart > -1){
                cartProducts.splice(productInCart, 1);

                carrito.update(id, {products: cartProducts})
                    .then(response => {res.status(200).json({success: true, response: response})})
                    .catch(error => {res.status(500).json({success: false, error: error.message})});
            } else {
                return res.status(400).json({success: false, response: 'Producto no encontrado'});
            }

            
        } else {
            return res.status(400).json({success: false, response: 'Carrito no encontrado'});
        }

    }
});

module.exports = router;