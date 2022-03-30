const { mariaDB } = require('../../config');
const knexMDb = require('knex')(mariaDB);

class ContendorMariaDB {
    constructor(table){
        this.knexObject = knexMDb;
        this.table = table;
    }

    //CREATE
    async save(object){
        try{
            const newDocument = await this.knexObject(this.table).insert(object);
            return newDocument;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }


    //READ
    async getAll(){
        try{
            const documents = await this.knexObject.from(this.table).select('*');
            return documents;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id){
        try{
            const document = await this.knexObject(this.table).select('*').where({id: id});
            return document;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }


    //UPDATE
    async update(id, newDataObject){
        try{
            const updatedDocument = await this.knexObject(this.table).where({id: id}).update(newDataObject);
            return updatedDocument;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    //DELETE

    async delete(id){
        try{
            await this.knexObject(this.table).where({id: id}).del();
            return `Producto ${id} eliminado`
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}


module.exports = ContendorMariaDB;