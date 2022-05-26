const express = require('express');
const router = express.Router();
const { Cart, Product } = require('../../models/daos/index');
const cart = new Cart;
const product = new Product;
const {cart_statuses} = require('../../config');
// const cartUtils = require('../../utils/cart.utils');

router.get('/', async (req, res) => {
    const user = req.user;
    if(user){
        const userCart = await cart.getCartByUserId(user._id, cart_statuses.CART_IN_PROCESS);

        if(userCart){
            const productPromises = userCart.products.map((item) => {
                return product.getById(item);
            });

            const productsInCart = await Promise.all(productPromises);
    
            res.render('main', {productsInCart: productsInCart, user: user, req: req});

        } else {
            res.render('main', {cart: [], user: user, req: req});
        }
    } else {
        res.redirect('/');
    }
});


router.post('/:product_id', (req, res) => {
    const { product_id } = req.params;
    const user = req.user._id;
    cart.createNewCart(user, product_id)
        .then(response => {res.status(200).redirect('/api/productos')})
        .catch(error => {res.status(500).json({success: false, error: error.message})});
});


router.post('/:id/productos', async (req, res) => {
    const { params: { id }, body: { productId } } = req;

    if(!productId){
        return res.status(400).json({success: false, error: 'Por favor, elija un producto'});
    } else {

        const existingCart = await cart.getById(id);
        const existingProduct = await product.getById(productId);
        
        if(existingCart){
            const cartProducts = existingCart.products;
            
            if(existingProduct){
                existingProduct.id = productId;
                cartProducts.push(existingProduct);

                cart.update(id, {products: cartProducts})
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
        cart.delete(id)
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

        const existingCart = await cart.getById(id);
        
        if(existingCart){
            const cartProducts = existingCart.products;
            let productInCart = cartProducts.findIndex(product => product.id == id_prod);
            
            if(productInCart > -1){
                cartProducts.splice(productInCart, 1);

                cart.update(id, {products: cartProducts})
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