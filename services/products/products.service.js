const { ProductRepository } = require('../../repositories/products.repository');
const { write } = require('../../winston/logger.config');
const { STATUS } = require('../../constants/api');

class ProductService {
  constructor() {
      this.productDAO = new ProductRepository;
  }

  async createProduct(productData){
    const { name, description, code, image, price, stock, sweet } = productData;
    try {
      if(!name || !description || !code || !image || !price || !stock || !sweet){
        write('error', "Por favor, complete todos los campos");
        throw new Error(`${STATUS.BAD_REQUEST.tag}, code: ${STATUS.BAD_REQUEST.code}, Por favor, complete todos los campos`);
      } else {
        const newProduct = {
          name,
          description,
          code,
          image,
          price,
          stock,
          sweet
        };
        return await this.productDAO.save(newProduct);
      }
    } catch(error) {
      write('error', error.message);
      throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
    }
  }
    
    async getAllProducts(){
      return await this.productDAO.getAll();
    }

    async getProductById(id) {
      try{
        const product = await this.productDAO.getById(id);
        if(!product){
          throw new Error(`${STATUS.BAD_REQUEST.tag}, code: ${STATUS.BAD_REQUEST.code}, El producto con el id ${id} no existe en nuestros registros`);
        } else {
          return product;
        }
      }catch(error){
        write('error', error.message);
        throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
      }
    }

    async filterProductsBy(field, value) {
      try{
        const products = await this.productDAO.filterBy(field, value);
        if(!products){
          throw new Error(`${STATUS.BAD_REQUEST.tag}, code: ${STATUS.BAD_REQUEST.code}, Ese filtro de productos no existe`);
        } else {
            return products;
        }
      }catch(error){
        write('error', error.message);
        throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
      }
    }

    async updateProduct(updatedProductData){
      const { params: {product_id}, body: {name, description, code, image, price, stock, sweet} } = updatedProductData;
      try{
        if(!name || !description || !code || !image || !price || !stock || !sweet){
          throw new Error(`${STATUS.BAD_REQUEST.tag}, code: ${STATUS.BAD_REQUEST.code}, Por favor, complete todos los campos`);
        } else {
          const product = await this.getProductById(product_id);
          if(!product){
            throw new Error(`${STATUS.BAD_REQUEST.tag}, code: ${STATUS.BAD_REQUEST.code}, 'El producto con id ${id} no existe en nuestros registros`);
          } else {
            const updatedProductData = {
              name,
              description,
              code,
              image,
              price,
              stock,
              sweet
            }
            return await this.productDAO.update(product_id, updatedProductData);
          }
        }
      } catch(error) {
        write('error', error.message);
        throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
      }
    }

    async deleteProduct(id){
		  return await this.productDAO.delete(id);
    }

}


module.exports = ProductService;