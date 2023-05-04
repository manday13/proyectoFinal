import express from 'express';
import { sequelize } from '../loadSequelize.js';
import { autentica } from './authentication.js';

import { Users_services } from '../modelos/Models.js'

//creo un objeto en el que se guardan las peticiones
const router = express.Router();

router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {
        Users_services.create(req.body)
            .then((item) => res.json({ ok: true, data: item }))
            .catch((error) => res.json({ ok: false, error: error.message }))
    })
});

export default router;