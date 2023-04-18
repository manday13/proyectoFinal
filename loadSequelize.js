import config from ".config/config.js"
import {Sequelize} from "sequelize"

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: "mysql",       
    }
);

export default sequelize;