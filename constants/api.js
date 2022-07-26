//Status
const STATUS = {
    OK: {
      tag: '[OK]',
      code: 200
    },
    CREATED: {
      tag: '[CREATED]',
      code: 201
    },
    BAD_REQUEST: {
      tag: '[BAD REQUEST]',
      code: 400,
    },
    UNAUTHORIZED: {
      tag: '[UNAUTHORIZED]',
      code: 403,
    },
    NOT_FOUND: {
      tag: '[NOT FOUND]',
      code: 404,
    },
    INTERNAL_ERROR: {
      tag: '[INTERNAL ERROR]',
      code: 500
    },
  };

  const CART_STATUSES = {
    CART_IN_PROCESS: 'in process',
    CART_PURCHASED: 'purchased',
    CART_REJECTED: 'rejected'
  }
  
  module.exports = {
    STATUS,
    CART_STATUSES
  }