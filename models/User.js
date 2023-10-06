const sequelize = require('../utils/database');
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    }
},{tableName:'users'})

module.exports = User;