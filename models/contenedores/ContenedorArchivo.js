const fs = require('fs');

class ContenedorArchivo{
    constructor(config, table){
        this.config = config;
        this.table = table;
    }

    async getProductsInCart(id) {
        try{
            const carts = await fs.promises.readFile('./data/carts.txt', 'utf-8');
            let cartsArray = JSON.parse(carts);
            let cart = cartsArray.find(cart => cart.id === id);

            if(!cart){
                return {error: 'Carrito no encontrado'};
            } else {
                return cart;
            }

        } catch(error) {
           return error.message;
        }
    }

    async saveCart(cart){
        try{
            if(cart){
                const cachedId = await fs.promises.readFile(`./data/cached_ids.txt`, 'utf-8');
                const carts = await fs.promises.readFile('./data/carts.txt', 'utf-8');
                const cachedIdsObject = JSON.parse(cachedId);
                let cartsArray = JSON.parse(carts);

                cart.id = cachedIdsObject.last_cart_id + 1;
                cachedIdsObject.last_cart_id = cart.id;
                cartsArray.push(cart);

                await fs.promises.writeFile(`./data/carts.txt`, JSON.stringify(cartsArray, null, 2));
                await fs.promises.writeFile('./data/cached_ids.txt', JSON.stringify(cachedIdsObject, null, 2));

                return cart.id;
            }
        } catch(error) {
            return error.message;
        }
    }

    async saveProductInCart(id, productId){
        try{
            if(id && productId){
                const carts = await fs.promises.readFile('./data/carts.txt', 'utf-8');
                let cartsArray = JSON.parse(carts);
                const cartIndex = cartsArray.findIndex(cart => cart.id === id);

                const products = await fs.promises.readFile('./data/products.txt', 'utf-8');
                let productsArray = JSON.parse(products);
                let product = productsArray.find(product => product.id === productId);

                if(cartIndex < 0){
                    return {error: 'Carrito no encontrado'};
                } else {
                    if(!product){
                        return {error: 'Producto no encontrado'};
                    } else {
                        cartsArray[cartIndex].products.push(product);
                        await fs.promises.writeFile(`./data/carts.txt`, JSON.stringify(cartsArray, null, 2));

                        return cartsArray;
                    }
                }
            }
        } catch(error) {
            return error.message;
        }
    }

    async deleteCart(id){
        try{
            if(id){
                const carts = await fs.promises.readFile('./data/carts.txt', 'utf-8');
                let cartsArray = JSON.parse(carts);
                let cartIndex = cartsArray.findIndex(cart => cart.id === id);

                if(cartIndex < 0){
                    return {error: 'Carrito no encontrado'};
                } else {
                    cartsArray.splice(cartIndex, 1);
                    await fs.promises.writeFile(`./data/carts.txt`, JSON.stringify(cartsArray, null, 2));
                    return cartsArray;
                }

            }
        } catch(error) {
            return error.message;
        }
    }

    async deleteProductFromCart(id, productId){
        try{
            if(id && productId){
                const carts = await fs.promises.readFile('./data/carts.txt', 'utf-8');
                let cartsArray = JSON.parse(carts);
                const cartIndex = cartsArray.findIndex(cart => cart.id === id);

                if(cartIndex < 0){
                    return {error: 'Carrito no encontrado'};
                } else {
                    const productIndexInCart = cartsArray[cartIndex].products.findIndex(product => product.id === productId);

                    if(productIndexInCart < 0){
                        return {error: 'Producto no encontrado en carrito'};
                    } else {
                        cartsArray[cartIndex].products.splice(productIndexInCart, 1);
                        await fs.promises.writeFile(`./data/carts.txt`, JSON.stringify(cartsArray, null, 2));
                        return cartsArray[cartIndex];
                    }
                }
            }
        } catch(error) {
            return error.message;
        }
    }
}


module.exports = {
    ContenedorArchivo
}