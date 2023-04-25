//el dataTypes lo podríamos importar directamente aquí y usarlo pero así tenemos menos imports
import {dataTypes, sequelize} from '../loadSequelize.js' 

export const Competencies = sequelize.define('Competencies', {
    name: dataTypes.STRING,
    foto: dataTypes.STRING,
    description: dataTypes.TEXT
}, { tableName: 'competencies', timestamps: false });

export const Volunteers = sequelize.define('Volunteers', {
    name: dataTypes.STRING,
    email: dataTypes.STRING,
    password: dataTypes.STRING,
    foto: dataTypes.STRING,
    role: dataTypes.STRING,
    pronouns: dataTypes.TINYINT,
    phone: dataTypes.STRING
}, { tableName: 'volunteers', timestamps: false });

export const Services = sequelize.define('Services', {
    name: dataTypes.STRING,
    description: dataTypes.TEXT('medium'), //MEDIUMTEXT EN SQL
    date: dataTypes.DATE,
    time: dataTypes.TIME,
    type: dataTypes.TINYINT,
    address: dataTypes.STRING,
    id_c: {
        name: "id_c",
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Competencies,
            key: 'id'
        }
    },
    id_v: {
        name: "id_v",
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Volunteers,
            key: 'id'
        }
    },
}, { tableName: 'services', timestamps: false });

export const Tutor = sequelize.define('Tutor', {
    name: dataTypes.STRING,
    email: dataTypes.STRING,
    description: dataTypes.TEXT('medium'), //MEDIUMTEXT ES STRING?
    password: dataTypes.STRING,
    foto: dataTypes.STRING,
    phone: dataTypes.STRING,
    pronouns: dataTypes.TINYINT
}, { tableName: 'tutor', timestamps: false });

export const Users = sequelize.define('Users', {
    name: dataTypes.STRING,
    email: dataTypes.STRING,
    password: dataTypes.STRING,
    foto: dataTypes.STRING,
    pronouns: dataTypes.TINYINT,
    phone: dataTypes.STRING,
    record: dataTypes.STRING,
    id_t: {
        name: "id_t",
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tutor,
            key: 'id'
        }
    }
}, { tableName: 'users', timestamps: false });



export const Users_services = sequelize.define('Users_services', {

    verification: dataTypes.TINYINT,
    id_u: {
        name: "id_u",
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    id_s: {
        name: "id_s",
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Services,
            key: 'id'
        }
    },
    
}, { tableName: 'users_services', timestamps: false });