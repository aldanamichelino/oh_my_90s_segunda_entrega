const firebaseConfig = require('./db/firebase/firebase.config.json');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


module.exports = {
  env: {
    PORT: process.env.PORT || 8080,
    PERS: process.env.PERS || 'Firebase'
  },
  firebase_config: {
    credential: firebaseConfig
  },
  mongoDB_config: {
    db_uri: `mongodb+srv://amichelino:${process.env.DATABASE_PASSWORD}@ecommerce.jtfko.mongodb.net/ecommerce?retryWrites=true&w=majority`
  },
  // sqlite: {
  //   client: 'sqlite3',
  //   connection: {
  //       filename: path.resolve(__dirname, "./ecommerce.sqlite")
  //   }
  // },
  // mariaDB: {
  //     client: 'mysql',
  //     connection: {
  //         host : '127.0.0.1',
  //         port : 3306,
  //         user : 'root',
  //         password : '',
  //         database : 'test'
  //     }
  // }
}
