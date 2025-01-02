import sequelize from './database.js';


const User = sequelize.define('User', {
  "id": {
    "type": "INTEGER",
    "primaryKey": true,
    "autoIncrement": true
  },
  "name": {
    "type": "STRING",
    "allowNull": false
  },
  "age": {
    "type": "INTEGER",
    "allowNull": false
  }, 
  "email": {
    "type": "STRING",
    "allowNull": false
  },
  "gender": {
    "type": "STRING",
    "allowNull": true
  }
})

export default User;