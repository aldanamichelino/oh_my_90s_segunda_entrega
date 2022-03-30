const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class ArchivoCarritosDao extends ContenedorArchivo {
    constructor(){
        super('carts');
    }
}

module.exports = ArchivoCarritosDao;