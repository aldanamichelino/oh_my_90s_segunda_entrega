require('dotenv').config();


module.exports = {
  env: {
    PORT: process.env.PORT || 8080
  },
  mongoDB_config: {
    db_uri: process.env.MONGODB_URI,
    db_name: process.env.MONGO_DATABASE
  }
}
