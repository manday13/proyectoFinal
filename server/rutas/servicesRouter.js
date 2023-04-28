import express from 'express';
import { sequelize } from '../loadSequelize.js';
import { autentica } from './authentication.js';

import { Services } from '../modelos/Models.js'

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

//to create a new workshop
router.post('/', function (req, res, next) {
  /*   upload(req, res, function (err) {
        if (err) {
            return res.status(500).json(err)
        }
 */
        sequelize.sync().then(() => {
/*             req.body.foto = req.file.filename;
            
 */         
                console.log("hello", req.body)
                Services.create(req.body)
                .then((item) => res.json({ ok: true, data: item }))
                .catch((error) => res.json({ ok: false, error: error.message }))
            


        /* }).catch((error) => {
            res.json({
                ok: false,
                error: error.message
            })
        }); */
    })
});

export default router;