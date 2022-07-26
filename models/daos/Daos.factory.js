const {UserDaoMongo, CartDaoMongo, ProductDaoMongo, OrderDaoMongo} = require('./mongo/index');


class DAOSFactory {
  static instance;
  
  static getDAOS(type) {
    if(!DAOSFactory.instance){
      let userDao;
      let productDao;
      let cartDao;
      let orderDao;
      switch(type.toLowerCase()) {
        case 'mem':
          userDao = new UserDaoMem();
          productDao = new ProductDaoMem();
          cartDao = new CartDaoMem();
          orderDao = new OrderDaoMem();
          break;
      case 'file':
          userDao = new UserDaoFile();
          productDao = new ProductDaoFile();
          cartDao = new CartDaoFile();
          orderDao = new OrderDaoFile();
          break;
        case 'mongo':
          userDao = new UserDaoMongo();
          productDao = new ProductDaoMongo();
          cartDao = new CartDaoMongo();
          orderDao = new OrderDaoMongo();
          break;
        default:
          throw new Error('Invalid data source, please provide one of the following (MEM | FILE | MONGO)')
      }
      return {
        userDao,
        productDao,
        cartDao,
        orderDao
      }
    } else {
      return DAOSFactory.instance;
    }
    
  }
}

module.exports = DAOSFactory;