import {Sequelize, DataTypes} from "sequelize"
import config from "./config/config.js"

export const sequelize = new Sequelize (
    config.database,
    config.username, //importa el orden? --> si importa
    config.password,    
    {
        host: config.host,
        dialect: config.dialect
    }

)



export const dataTypes = DataTypes; //para poder definir los modelos y especificar que tipo de data son cada uno de ellos