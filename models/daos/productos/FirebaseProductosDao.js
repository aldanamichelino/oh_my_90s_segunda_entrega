const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");

class FirebaseProductosDao extends ContenedorFirebase {
    constructor(){
        super('products');
    }
}

module.exports = FirebaseProductosDao;