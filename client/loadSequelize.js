import config from './config/config.js'
import { Sequelize, DataTypes } from "sequelize";
 
export const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: "mysql",
        dialectOptions: {decimalNumbers: true} //para que en los type decimal me los devuelva como number no como string
    }
);

export const dataTypes = DataTypes; 