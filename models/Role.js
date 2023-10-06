const sequelize = require('../utils/database');
const {DataTypes} = require('sequelize')

const Role = sequelize.define('role',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{tableName:'roles'})

module.exports = Role;