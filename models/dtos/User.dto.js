class UserDTO {
    constructor(userObj, _id){
        Object.assign(this, userObj);
        this.createdAt = userObj.createdAt || Date.now();
        this.updatedAt = Date.now();
        this.isAdmin = userObj.isAdmin ?? false;
        if (_id) {
        this._id = _id;
        }
    }
}

module.exports = UserDTO;