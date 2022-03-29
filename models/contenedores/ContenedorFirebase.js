const { firestore } = require("firebase-admin");
const admin = require("firebase-admin");
const { firebase_config } = require('../../config');

admin.initializeApp({
    credential: admin.credential.cert(firebase_config.credential)
});

console.log('Firebase connected!');

class ContenedorFirebase {
    constructor(collection){
        const db = firestore();
        this.query = db.collection(collection);
    }

    //CREATE
    async save(object){
        try{
            let docRef = this.query.doc();
            return await docRef.set(object);
        } catch(error){
            console.log(error);
        }
    }


    //READ
    async getAll(){
        try{
            const docRef = await this.query.get();
            let documents = docRef.docs;

            return documents.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

        } catch(error){
            console.log(error)
        }
    }

    async getById(id){
        try{
            const docRef = this.query.doc(id);

            if(!docRef){
                throw new Error('El documento solicitado no existe en nuestra base de datos');
            } else {
                const document = await docRef.get();
                return document.data();
            }

        } catch(error) {
            console.log(error)
        }
    }

    //UPDATE
    async update(id, newDataObject){
        try{
            const docRef = this.query.doc(id);

            if(!docRef){
                throw new Error('El documento solicitado no existe en nuestra base de datos');
            } else {
                return await docRef.update(newDataObject);
            }

        } catch(error) {
            console.log(error)
        }
    }

    //DELETE
    async delete(id){
        try{
            const docRef = this.query.doc(id);

            if(!docRef){
                throw new Error('El documento solicitado no existe en nuestra base de datos');
            } else {
                return await docRef.delete();
            }
            
        } catch(error) {
            console.log(error);
        }
    }


}

module.exports = ContenedorFirebase;