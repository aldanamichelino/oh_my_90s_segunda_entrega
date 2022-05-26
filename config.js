require('dotenv').config();
const logger = require('./winston/winston.config');

const write = (level, message) => {
    try {
        switch (level) {
            case 'info':
                logger.info(message);
                break;
            case 'warn':
                logger.warn(message);
                break;
            case 'error':
                logger.error(message);
                break;
            case 'debug':
                logger.debug(message);
                break;
        }
    } catch(error) {
        logger.error(error.message);
    }
}


module.exports = {
  env: {
    PORT: process.env.PORT || 8080
  },
  mongoDB_config: {
    db_uri: process.env.MONGODB_URI,
    db_name: process.env.MONGO_DATABASE
  },
  cart_statuses: {
    CART_IN_PROCESS: 'in process',
    CART_PURCHASED: 'purchased',
    CART_REJECTED: 'rejected'
  },
  write
}