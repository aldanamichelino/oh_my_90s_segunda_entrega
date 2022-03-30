const fs = require('fs');

class ContenedorArchivo{
    constructor(document){
        this.document = document

        console.log('Almacenamiento mediante archivos')
    }

    //CREATE
    async save(item){
        try{
            if(item){
                const documents = await fs.promises.readFile(`./db/archivos/${this.document}.txt`, 'utf-8');
                const ids = await fs.promises.readFile(`./db/archivos/${this.document}_cached_ids.txt`, 'utf-8');
                let documentsArray = JSON.parse(documents);
                let cashedId = JSON.parse(ids);
                
                item.id = Number(ids) + 1;
                cashedId = item.id;
                documentsArray.push(item);

                await fs.promises.writeFile(`./db/archivos/${this.document}.txt`, JSON.stringify(documentsArray, null, 2));
                await fs.promises.writeFile(`./db/archivos/${this.document}_cached_ids.txt`, JSON.stringify(cashedId, null, 2));

                return item.id;
            }
        } catch(error) {
            return error.message;
        }
    }

    //READ
    async getAll(){
        try{
            const documents = await fs.promises.readFile(`./db/archivos/${this.document}.txt`, 'utf-8');
            let documentsArray = JSON.parse(documents);
            return documentsArray;

        } catch(error) {
            console.log(`Hubo un error: ${error.message}`);
        }
    }

    async getById(id){
        try{
            if(id){
                const documents = await fs.promises.readFile(`./db/archivos/${this.document}.txt`, 'utf-8');
                let documentsArray = JSON.parse(documents);
                let document = documentsArray.find(document => document.id == id);

                if(!document){
                    return {error: 'El documento solicitado no se encuentra en nuestra base de datos'}
                } else {
                    return document;
                }
        
            }
        } catch(error) {
            console.log(`Hubo un error: ${error.message}`);
        }
    }


    //UPDATE

    async update(id, newProductData){
        if(id && newProductData){
            try{
                const documents = await fs.promises.readFile(`./db/archivos/${this.document}.txt`, 'utf-8');
                let documentsArray = JSON.parse(documents);
                let documentIndex = documentsArray.findIndex(document => document.id == id);

                if(documentIndex < 0){
                    return {error: 'El producto no existe'};
                } else {
                    newProductData.id = id;
                    documentsArray[documentIndex] = newProductData;
                    await fs.promises.writeFile(`./db/archivos/${this.document}.txt`, JSON.stringify(documentsArray, null, 2));
                    return documentsArray;
                }

            } catch(error) {
                console.log(`Hubo un error: ${error.message}`);
            }
        }
    }


    //DELETE
    async delete(id){
        try{
            if(id){
                const documents = await fs.promises.readFile(`./db/archivos/${this.document}.txt`, 'utf-8');
                let documentsArray = JSON.parse(documents);
                let documentIndex = documentsArray.findIndex(item => item.id === id);

                if(documentIndex < 0){
                    return {error: 'Carrito no encontrado'};
                } else {
                    documentsArray.splice(documentIndex, 1);
                    await fs.promises.writeFile(`./db/archivos/${this.document}.txt`, JSON.stringify(documentsArray, null, 2));
                    return documentsArray;
                }

            }
        } catch(error) {
            return error.message;
        }
    }

}


module.exports = ContenedorArchivo;