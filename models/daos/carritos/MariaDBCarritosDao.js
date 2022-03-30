const ContendorMariaDB = require("../../contenedores/ContenedorMariaDB");

class MariaDBCarritosDao extends ContendorMariaDB {
    constructor(){
        super('carts');
    }
}

module.exports = MariaDBCarritosDao;