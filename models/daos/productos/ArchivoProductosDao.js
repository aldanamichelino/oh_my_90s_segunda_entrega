const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class ArchivoProductosDao extends ContenedorArchivo {
    constructor(){
        super('products');
    }
}

module.exports = ArchivoProductosDao;