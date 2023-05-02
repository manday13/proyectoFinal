
import express from 'express';//siempre importamos express que es la libreria que se encarga de recibir y enviar
import jsonwebtoken from 'jsonwebtoken'; // para la creacion del token cuando se logeen
import multer from 'multer'; //para poder trabajar con archivos (en nuestro caso imagenes)
import {secretKey, expiredAfter} from './loginconfig.js' //importamos estos datos que usaremos en la creacion del token cuando se logeen
import bcrypt from 'bcrypt'; //se utiliza para encriptar cosas, en nuestro caso la contraseña del usuario 
import {sequelize} from '../loadSequelize.js'; //para conectar con la base de datos
import {autentica} from './authentication.js'; //para que cada vez que se intente hacer algo se compruebe si se ha caducado el token o no para hacerlo o no hacerlo

import {Users, Tutor} from '../modelos/Models.js'

Tutor.hasMany(Users, {foreignKey: "id_t"})
Users.belongsTo(Tutor, {foreignKey: "id_t"})

const router = express.Router()

//creacion de un nuevo cliente
router.post('/', function(req,res,next){
    sequelize.sync().then(()=>{
        req.body.foto = "default.png" //para que al hacer el register y como no pedimos foto se le asocie una de defecto que ya tenemos guardada en la carpeta fotos
        const hash = bcrypt.hashSync(req.body.password,10); //me crea un hash del password del cliente para que se guarde encriptado
        req.body.password = hash; //ponemos que ahora la contraseña sea esta encriptada para que se guarde encriptada en nuestra bbdd
        Tutor.create(req.body) //creamos el cliente en la bbdd
            .then((item)=>res.json({ok: true, data: item}))
            .catch((error) => res.json({ok: false, error: error.message}))
    }).catch((error)=>{
        res.json({
            ok: false,
            error: error.message
        })
    })
})

//login de un cliente
router.post('/login', (req,res) => {
    const response = {};
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400).json({ok:false, msg: "Email or password not received"})
    }
    Tutor.findOne({where: {email}})
        .then((tut)=> {
            if (tut && bcrypt.compareSync(password, tut.password)){
                return tut;
            } else {
                throw "Client/password invalids"; //deja de hacer el resto y pasa esto como error
            }
        })
        .then(tut => { //si todo ha ido bien, es decir coincide el tut con su password, crea el token que es el que le permitira acceder a los sitios de la pagina
            response.token = jsonwebtoken.sign(
                { //aqui ponemos la informacion que queremos meter dentro que se puede extraer
                    expiredAt: new Date().getTime() + expiredAfter, //para que caduque en el momento en el que pase el tiempo que hemos definido en expiredafter
                    email,
                    name: tut.name,
                    id: tut.id,
                },
                secretKey //finalmente ponemos una signature key que nos sirve para que el token sea unico
            ); //hasta aqui la creacion del token
            response.ok = true;
            res.json(response);
        })
        .catch(err => res.status(400).json({ok: false, msg: err}))
});

router.get('/:id', autentica, function(req,res,next){
    sequelize.sync().then(()=>{
        Tutor.findOne({where: {id: req.params.id},
        include: [{model: Users}]})
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

//ponemos las caracteristicas del sitio en el que se guardaran los archivos y con que nombre se guardaran (solo es necesario 1 vez)
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'fotos')
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})
//la siguiente constante upload es la que define donde se guardaran (en storage, que tiene ciertas caracteristicas que hemos definido antes)
//y ademas dice si se van a guardar 1 o mas cosas (single --> solo 1) y cual es el nombre de esa cosa (para que sepa que se tiene que guardar)
const upload = multer({storage: storage}).single('file');

//a continuacion hacemos la modificacion de un tutor

router.put('/', autentica, function(req,res,next){
    upload(req,res, function (err){
        sequelize.sync()
        .then(()=>{            
            Tutor.findOne({where: {id: req.body.id}})
                .then(tutor =>{
                    if(req.file)
                        req.body.foto = req.file.path.split("\\")[1];
                    return tutor.update(req.body)                        
                })
                .then(newtutor => res.json({
                    ok: true,
                    data: newtutor
                }))
                .catch(error => res.json({
                    ok: false,
                    error: error
                }));
        }).catch((error) => {
            res.json({
                ok: false,
                error: error
            })
        });
    });
});




export default router;