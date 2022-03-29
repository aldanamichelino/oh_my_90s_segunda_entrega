const { env: {PERS} } = require('../../config');

const Carrito = require(`./carritos/${PERS}CarritosDao`);
const Producto = require(`./productos/${PERS}ProductosDao`);

module.exports = {
    Carrito,
    Producto
}
