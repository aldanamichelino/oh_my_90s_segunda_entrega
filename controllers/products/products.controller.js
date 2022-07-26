const ProductService = require('../../services/products/products.service');
const { write } = require('../../winston/logger.config');
const { viewErrorHandler } = require('../../utils/viewErrors');

class ProductController{
    constructor(){
        this.service = new ProductService;
        this.getProductsController = this.getProductsController.bind(this);
        this.getProductByIdController = this.getProductByIdController.bind(this);
        this.getFilteredProductsController = this.getFilteredProductsController.bind(this);
        this.saveNewProductController = this.saveNewProductController.bind(this);
        this.updateProductController = this.updateProductController.bind(this);
        this.deleteProductController = this.deleteProductController.bind(this);
    }

    async getProductsController(req, res){
      try {
        const user = req.user;
        if(user) {
          const products = await this.service.getAllProducts();
          return res.render('main', {products: products, user: user, req: req});
        }
      } catch (error) {
        write('error', error.message);
        viewErrorHandler(error, res);
      }
    }

	//this is a postman route
    async getProductByIdController(req, res, next){
      try {
        const { product_id } = req.params;
        const product = await this.service.getProductById(product_id);
        return res.status(200).send({response: product});
      } catch (error) {
        console.log(error.message)
        next(error);
      }
    }

    async getFilteredProductsController(req, res){
      try {
        const { flavor } = req.params;
        const user = req.user;
        const value = flavor === 'dulces' ? true : false;
        const products = await this.service.filterProductsBy('sweet', value);
        return res.render('main', {products: products, user: user, req: req});
      } catch (error) {
        write('error', error.message);
        viewErrorHandler(error, res);
      }
    }

	//this is a postman route
    async saveNewProductController(req, res, next){
      console.log('req.body', req.body)
      try {
        const newProduct = await this.service.createProduct(req.body);
        return res.status(200).send({success: true, response: newProduct});
      } catch (error) {
        console.log(error.message)
        next(error);
      }
    }

	//this is a postman route
    async updateProductController(req, res, next){
      try {
        const updatedProduct = await this.service.updateProduct(req);
        return res.status(200).send({success: true, response: updatedProduct});
      } catch (error) {
        console.log(error.message)
        next(error);
      }
    }

	//this is a postman route
    async deleteProductController(req, res, next){
      try {
        const {product_id} = req.params;
        const deletedProduct = await this.service.deleteProduct(product_id);
        return res.status(200).send({success: true, response: deletedProduct});
      } catch (error) {
        console.log(error.message)
        next(error);
      }
    }

}

module.exports = ProductController;