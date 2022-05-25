const express = require('express');
const authRoutes = require('./auth/auth.routes');
const productsRoutes = require('./products/products.routes');
const cartRoutes = require('./cart/cart.routes');
const router = express.Router();


//Routes
router.use('/auth', authRoutes);
router.use('/productos', productsRoutes);
router.use('/carrito', cartRoutes);


module.exports = router;