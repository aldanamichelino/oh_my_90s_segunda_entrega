class ProductDTO {
    constructor(productObj, _id){
        Object.assign(this, productObj);
        this.createdAt = productObj.createdAt || Date.now();
        this.updatedAt = Date.now();
        if (_id) {
        this._id = _id;
        }
    }
}

module.exports = ProductDTO;