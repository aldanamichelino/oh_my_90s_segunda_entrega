const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/auth.routes');
const productsRoutes = require('./products/products.routes');
const cartRoutes = require('./cart/cart.routes');
const ordersRoutes = require('./orders/orders.routes');

//Routes
router.use('/auth', authRoutes);
router.use('/carrito', cartRoutes.initialize());
router.use('/productos', productsRoutes.initialize());
router.use('/mispedidos', ordersRoutes.initialize());


module.exports = router;