const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");

class FirebaseCarritosDao extends ContenedorFirebase {
    constructor(){
        super('carts');
    }
}

module.exports = FirebaseCarritosDao;