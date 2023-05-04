import express from 'express';
import { sequelize } from '../loadSequelize.js';
import { autentica } from './authentication.js';
import multer from 'multer'; //para poder trabajar con archivos (en nuestro caso imagenes)

import { Services, Competencies, Users_services, Users } from '../modelos/Models.js'

//establecemos relaciones
Competencies.hasMany(Services, {foreignKey: "id_c"})
Services.belongsTo(Competencies, {foreignKey: "id_c"})
Services.belongsToMany(Users, {through: Users_services, foreignKey: "id_s"})
Users.belongsToMany(Services, {through: Users_services, foreignKey: "id_u"})
// Services.hasMany(Users_services, {foreignKey: "id_s"})
// Users_services.belongsTo(Users, {foreignKey: "id_u"})

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

router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Services.findOne({ where: { id: req.params.id },
        include: [{model: Competencies},
        {model: Users}] })
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

/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'fotos')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
//la siguiente constante upload es la que define donde se guardaran (en storage, que tiene ciertas caracteristicas que hemos definido antes)
//y ademas dice si se van a guardar 1 o mas cosas (single --> solo 1) y cual es el nombre de esa cosa (para que sepa que se tiene que guardar)
const upload = multer({ storage: storage }).single('file'); */

//to create a new workshop
router.post('/', function (req, res, next) {
    /* upload(req, res, function (err) {
        if (err) {
            return res.status(500).json(err)
        } */

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