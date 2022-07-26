class CartDTO {
    constructor(cartObj, _id){
        Object.assign(this, cartObj);
        this.createdAt = cartObj.createdAt || Date.now();
        this.updatedAt = Date.now();
        if (_id) {
        this._id = _id;
        }
    }
}

module.exports = CartDTO;