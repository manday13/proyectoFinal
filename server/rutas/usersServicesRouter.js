import express from 'express';
import { sequelize } from '../loadSequelize.js';
import { autentica } from './authentication.js';
import { Users_services } from '../modelos/Models.js'

//creo un objeto en el que se guardan las peticiones
const router = express.Router();

router.post('/', autentica,  function (req, res, next) {
    sequelize.sync().then(() => {
        Users_services.create(req.body)
            .then((item) => res.json({ ok: true, data: item }))
            .catch((error) => res.json({ ok: false, error: error.message }))
    })
});

//endpoitn para borrar un campo de la tabla
router.delete('/', function (req, res, next) {

    const { userId, serviceId } = req.body;

    sequelize.sync().then(() => {

        Users_services.destroy({ 
            where: { 
                id_u: userId,
                id_s: serviceId
            } 
        })
            .then((data) => res.json({ ok: true, data }))
            .catch((error) => res.json({ ok: false, error: error.message }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});

router.put('/', autentica, function(req, res, next){
    const participants = req.body;

    function updateUser(participant){
        return Users_services.update(
            {verification: participant.verification},
            { 
                where: { 
                    id_u: participant.idUser,
                    id_s: participant.idService
                } 
            });
    }
    const promises = participants.map(participant => updateUser(participant));

    Promise.all(promises)
        .then(results => res.json({
            ok: true,
            data: results
        })) 
        .catch(error => res.json({
            ok: false,
            error:error
        })
        )
})

export default router;