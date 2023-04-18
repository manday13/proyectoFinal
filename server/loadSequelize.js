import {Sequelize} from "sequelize"
import config from "./config/config.js"

const sequelize = new Sequelize (
    config.database,
    config.password,
    config.username,
    {
        host: config.host,
        dialect: config.dialect
    }

)

export default sequelize;