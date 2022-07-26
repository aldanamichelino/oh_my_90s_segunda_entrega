const { CartRepository } = require('../../repositories/carts.repository');
const { STATUS } = require('../../constants/api');
const { write } = require('../../winston/logger.config');
const { CART_STATUSES } = require('../../constants/api');
const { ProductRepository } = require('../../repositories/products.repository');
const { OrderRepository } = require('../../repositories/orders.repository');
const { sendNotification } = require('../../notifications/nodemailer.config');
const { sendSMS, sendWhatsapp } = require('../../notifications/twilio.config');
const ejs = require("ejs");
const { ADMIN_EMAIL, ADMIN_WHATSAPP } = require('../../config');


class CartService {
  constructor() {
    this.cartDAO = new CartRepository;
    this.productDAO = new ProductRepository;
    this.orderDAO = new OrderRepository;
  }
  
  async createCart(user, product_id, quantity){
    return await this.cartDAO.createCart(user, product_id, quantity);
  }
  
  async getAllCarts(){
    return await this.cartDAO.getAll();
  }

  async getCartById(id) {
    try{
      const cart = await this.cartDAO.getById(id);
      if(!cart){
        throw new Error(`${STATUS.BAD_REQUEST.tag}, code: ${STATUS.BAD_REQUEST.code}, El carrito con el id ${id} no existe en nuestros registros`);
      } else {
          return cart;
      }
    }catch(error){
      write('error', error.message);
      throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
    }
  }

  async getCartByUserId(user){
    try{
      const cart = await this.cartDAO.getCartByUserId(user._id, CART_STATUSES.CART_IN_PROCESS);
      if(cart){
        const productPromises = cart._doc.products.map((item) => {
          return this.productDAO.getById(item.product_id);
        });
        const productsInCart = await Promise.all(productPromises);
        const productsInCartData = productsInCart.map(product => {
            const item = cart._doc.products.find(productInCart => productInCart.product_id == product._id.toString());
            product.quantity = item.quantity;
            return product;
        });
        const totalSpent = productsInCartData.reduce((acc, item) => acc + item.quantity * item.price, 0);
        cart.productsInCartData = productsInCartData;
        cart.totalSpent = totalSpent;

        const cartData = {
          cart,
          productsInCartData,
          totalSpent
        };

        return cartData;
      }
    } catch(error) {
      write('error', error.message);
      throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
    }
  }

  async updateCart(cartId, newCartState){
    return await this.cartDAO.update(cartId, newCartState);
  }

  async purchaseCart(user){
    try{
      const userCart = await this.getCartByUserId(user._id, CART_STATUSES.CART_IN_PROCESS);
      if(userCart){
        const changeCartToPurchased = await this.updateCart(userCart.cart._doc._id, {'status': CART_STATUSES.CART_PURCHASED});
        if(changeCartToPurchased){
          const productPromises = userCart.cart._doc.products.map((item) => {
            return this.productDAO.getById(item.product_id);
          });
          const productsInCart = await Promise.all(productPromises);
          const productsInCartData = productsInCart.map(product => {
            const item = userCart.cart._doc.products.find(productInCart => productInCart.product_id == product._id.toString());
            product.quantity = item.quantity;
            return product;
          });

          const totalSpent = productsInCartData.reduce((acc, item) => acc + item.quantity * item.price, 0);

          const totalOrders = await this.orderDAO.count();

          const newOrderData = {
            number: totalOrders + 1,
            products : productsInCartData.map(product => {
              return { 
                product_name: product.name,
                product_description: product.description,
                quantity: product.quantity,
                price: product.price
              }
            }),
            status: 'generated',
            email: user.email
          };

          const newOrder = await this.orderDAO.save(newOrderData);

          if(newOrder){
            //new order email notification to admin
            const data = await ejs.renderFile("notifications/newPurchase.ejs", { user: user, products: productsInCartData, totalSpent: totalSpent, orderNumber: newOrderData.number  });
            
            const mailOptions = {
                from: "Tienda Sweet 90's",
                to: ADMIN_EMAIL,
                subject: `Nuevo pedido de ${user.name} ${user.email}`,
                html: data
            };
  
            sendNotification(mailOptions);
            sendWhatsapp(ADMIN_WHATSAPP, `Nuevo pedido de ${user.name} ${user.email}`);
            sendSMS(user.phone, 'Tu pedido fue recibido y se encuentra en proceso');
          } else {
            write('error', 'Ocurrió un error al procesar la order');
            throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, Ocurrió un error al procesar la orden`);
          }
          
        }
      }
    } catch(error) {
      write('error', error.message);
      throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
    }
  }

  async deleteProductFromCart(user_id, product_id){
    return await this.cartDAO.deleteProductFromCart(user_id, product_id);
  }

  async deleteCart(id){
    return await this.cartDAO.delete(id);
  }
}


module.exports = CartService;