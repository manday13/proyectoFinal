import express from 'express';
import {sequelize} from '../loadSequelize.js';
import {autentica} from './authentication.js';

import {Services} from '../modelos/Models.js'

//creo un objeto en el que se guardan las peticiones
const router = express.Router();

router.get('/', function (req, res, next) {

    sequelize.sync().then(() => {

        Services.findAll()
            .then(services => res.json({
                ok: true,
                data: services
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});

router.get('/:id', autentica, function (req, res, next) {
    sequelize.sync().then(() => {

        Services.findOne({ where: { id: req.params.id } })
            .then(al => res.json({
                ok: true,
                data: al
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});

export default router;