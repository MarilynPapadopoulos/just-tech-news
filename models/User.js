const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our User Model
class User extends Model {}

//define table columns and configuration
User.init(
    {
        //define an id column
       id: {
           type: DataTypes.INTEGER,
           //NOT NULL
           allowNull: false,
           primaryKey: true,
           autoIncrement: true
       },
       //define a username column
       username: {
           type: DataTypes.STRING,
           allowNull: false
       },
       //define an email column
       email: {
           type: DataTypes.STRING,
           allowNull: false, 
           //there cannot be any duplicate email values
           unique: true,
           validate: {
               isEmail: true
           }
       },
       //define password column
       password: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               //must be at least four characters long
               len:[4]
           }
       }
    },
    {
        hooks: { 
            //set up beforeCreate lifecyle "hook" functionality
           async beforeCreate(newUserData) {
               newUserData.password = await bcrypt.hash(newUserData.password, 10);
               return newUserData;
           },
           //set up beforeUpdate lifecyle "hook" functionality
           async beforeUpdate(updateUserData) {
               updatedUserData.password = await bcrypt.hash(newUserData.password, 10);
               return newUserData;
           }

        },
        //TABLE CONFIGURATION OPTIONS

        //pass in our imported sequelize connction ( the direct connection to our database )
        sequelize,
        //don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluaralize name of database table
        freezeTableName: true,
        //use underscored instead of camil-casing
        underscored: true,
        //make it so our model name stays lowercase in the data base
        modelName: 'user'
    }
);

module.exports = User;