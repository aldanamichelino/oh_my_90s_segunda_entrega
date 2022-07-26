class OrderDTO {
  constructor(orderObj, _id){
      Object.assign(this, orderObj);
      this.createdAt = orderObj.createdAt || Date.now();
      this.updatedAt = Date.now();
      if (_id) {
      this._id = _id;
      }
  }
}

module.exports = OrderDTO;