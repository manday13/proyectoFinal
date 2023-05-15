import express from 'express';
import { sequelize } from '../loadSequelize.js';
import { autentica } from './authentication.js';
import multer from 'multer'; //para poder trabajar con archivos (en nuestro caso imagenes)

import { Services, Competencies, Users_services, Users, Volunteers } from '../modelos/Models.js'

//establecemos relaciones
Competencies.hasMany(Services, { foreignKey: "id_c" })
Services.belongsTo(Competencies, { foreignKey: "id_c" })
Services.belongsToMany(Users, { through: Users_services, foreignKey: "id_s" })
Users.belongsToMany(Services, { through: Users_services, foreignKey: "id_u" })
Volunteers.hasMany(Services, { foreignKey: "id_v" })
Services.belongsTo(Volunteers, { foreignKey: "id_v" })

//creo un objeto en el que se guardan las peticiones
const router = express.Router();

const workType = {
    "1" : "defaultPainting.jpg",
    "2" : "defaultSculpture.jpg",
    "3" : "defaultKungfu.jpg",
    "4" : "defaultCeramic.jpeg",
     "5" : "defaultTherapy.jpg"
}

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

        Services.findOne({
            where: { id: req.params.id },
            include: [{ model: Competencies },
            { model: Users }, { model: Volunteers }]
        })
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
router.post('/', autentica, function (req, res, next) {  
    sequelize.sync().then(() => {        
        req.body.foto = workType[req.body.work_type] || "default.jpg"
        req.body.date = req.body.date !== '' ? req.body.date : null  
        req.body.limit = req.body.limit !== '' ? req.body.limit : null
        req.body.serviceType = req.body.serviceType !== '' ? req.body.serviceType : null
        req.body.work_type = req.body.work_type !== '' ? req.body.work_type : null
        req.body.id_c = req.body.id_c !== '' ? req.body.id_c : null
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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'fotos')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file');


router.put('/', autentica, function (req, res, next) {
    upload(req, res, function (err) {
        console.log('body', req.body.id)
        sequelize.sync()
            .then(() => {
                Services.findOne({ where: { id: req.body.id } })
                    .then(item => {
                        if (req.file)
                            req.body.foto = req.file.filename;
                        return item.update(req.body)
                    })
                    .then(item => res.json({
                        ok: true,
                        data: item
                    }))
                    .catch(error => res.json({
                        ok: false,
                        error: error + 'error1'
                    }));
            }).catch((error) => {
                res.json({
                    ok: false,
                    error: error + 'error2'
                })
            });
    });
});

router.delete('/:id', autentica, function (req, res, next) {

    sequelize.sync().then(() => {

        Services.destroy({ where: { id: req.params.id } })
            .then((data) => res.json({ ok: true, data }))
            .catch((error) => res.json({ ok: false, error }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});

export default router;