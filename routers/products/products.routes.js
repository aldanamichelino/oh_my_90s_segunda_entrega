const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/products/products.controller');
const { write } = require('../../winston/logger.config');
const auth = require('../../middlewares/auth');
const { STATUS } = require('../../constants/api');
 

//Middlewares
const isAdmin = (req, res, next) => {
  const user = req.user;
  console.log('user', user);
  if(user.isAdmin){
    next();
  } else {
    write('error', `ruta ${req.originalUrl} método ${req.method} no autorizada`);
    throw new Error(`${STATUS.UNAUTHORIZED.tag}, code: ${STATUS.UNAUTHORIZED.code}, ruta ${req.originalUrl} método ${req.method} no autorizada`);
  }
};

class ProductRoutes{
  constructor(){
      this.controller = new ProductController();
  }

  initialize(prefix = ""){
    router.get(`${prefix}/`, auth, this.controller.getProductsController);
    router.get(`${prefix}/:product_id`, auth, this.controller.getProductByIdController);
    router.get(`${prefix}/categoria/:flavor`, auth, this.controller.getFilteredProductsController);
    router.post(`${prefix}/`, auth, isAdmin, this.controller.saveNewProductController);
    router.put(`${prefix}/:product_id`, auth, isAdmin, this.controller.updateProductController);
    router.delete(`${prefix}/:product_id`, auth, isAdmin, this.controller.deleteProductController);

    return router;
  }
}

module.exports = new ProductRoutes();