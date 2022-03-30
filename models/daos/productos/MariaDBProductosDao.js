const ContendorMariaDB = require("../../contenedores/ContenedorMariaDB");

class MariaDBProductosDao extends ContendorMariaDB {
    constructor(){
        super('products');
    }
}

module.exports = MariaDBProductosDao;