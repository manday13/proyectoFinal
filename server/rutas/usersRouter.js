
import express from 'express';//siempre importamos express que es la libreria que se encarga de recibir y enviar
import jsonwebtoken from 'jsonwebtoken'; // para la creacion del token cuando se logeen
import multer from 'multer'; //para poder trabajar con archivos (en nuestro caso imagenes)
import {secretKey, expiredAfter} from './loginconfig.js' //importamos estos datos que usaremos en la creacion del token cuando se logeen
import bcrypt from 'bcrypt'; //se utiliza para encriptar cosas, en nuestro caso la contraseña del usuario 
import {sequelize} from '../loadSequelize.js'; //para conectar con la base de datos
import {autentica} from './authentication.js'; //para que cada vez que se intente hacer algo se compruebe si se ha caducado el token o no para hacerlo o no hacerlo

import {Users, Tutor, Services, Users_services, Competencies} from '../modelos/Models.js'

Tutor.hasMany(Users, {foreignKey: "id_t"})
Users.belongsTo(Tutor, {foreignKey: "id_t"})
Users.belongsToMany(Services, {through: Users_services, foreignKey: "id_u"})
Services.belongsToMany(Users, {through: Users_services, foreignKey: "id_s"})
Competencies.hasMany(Services, {foreignKey: "id_c"})
Services.belongsTo(Competencies, {foreignKey: "id_c"})


const router = express.Router()

//creacion de un nuevo cliente
router.post('/', function(req,res,next){
    sequelize.sync().then(()=>{
        req.body.foto = "default.png" //para que al hacer el register y como no pedimos foto se le asocie una de defecto que ya tenemos guardada en la carpeta fotos
        const hash = bcrypt.hashSync(req.body.password,10); //me crea un hash del password del cliente para que se guarde encriptado
        req.body.password = hash; //ponemos que ahora la contraseña sea esta encriptada para que se guarde encriptada en nuestra bbdd
        Users.create(req.body) //creamos el cliente en la bbdd
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
        return;
    }
    Users.findOne({where: {email}})
        .then((user)=> {
            if (!user){
                throw "User not found, are you sure you want to log in as a client?"
            }
            if (user && bcrypt.compareSync(password, user.password)){
                return user;
            } else {
                throw "User and/or password invalid"; //deja de hacer el resto y pasa esto como el error del catch del final!!
            }
        })
        .then(user => { //si todo ha ido bien, es decir coincide el user con su password, crea el token que es el que le permitira acceder a los sitios de la pagina
            response.token = jsonwebtoken.sign(
                { //aqui ponemos la informacion que queremos meter dentro que se puede extraer
                    expiredAt: new Date().getTime() + expiredAfter, //para que caduque en el momento en el que pase el tiempo que hemos definido en expiredafter
                    email,
                    name: user.name,
                    id: user.id,
                    record: user.record,
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
        Users.findOne({where: {id: req.params.id},
        include: [{model: Tutor}, 
            {model: Services,
            include: {model: Competencies}}]})
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


//a continuacion hacemos la modificacion de un Users
//aqui estamos editando el usuario --> no es lo mismo que añadir solo la letter of recommendation
router.put('/', autentica, function(req,res,next){
    upload(req,res, function (err){
        sequelize.sync()
        .then(()=>{            
            Users.findOne({where: {id: req.body.id}})
                .then(user =>{
                    if(req.file)
                        req.body.foto = req.file.filename;
                    return user.update(req.body)                        
                })
                .then(newuser => res.json({
                    ok: true,
                    data: newuser
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

//endpoint para borrar un cliente de la bd
router.delete('/', autentica,  function (req, res, next) {

    const { userId } = req.body;

    sequelize.sync().then(() => {

        Users.destroy({ 
            where: { 
                id: userId
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

//creamos otra funcion put diferente, ya que habrá una persona que no soy yo sino mi tutor (Externo) que podrá editar cosas de 
//mi perfil. Cuando esto pasa, no podemos usar la misma ruta que para editar cosas personales de mi perfil ya que entonces la
//otra persona podria copiar la url --> usar postman y hacerme cambios en mi cuenta
const letterStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'letters')
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const uploadLetter = multer({storage: letterStorage}).single('file');

router.put('/letter', autentica, function(req,res,next){
    uploadLetter(req,res, function (err){
        sequelize.sync()
        .then(()=>{            
            Users.findOne({where: {id: req.body.id}})
                .then(user =>{
                    if(req.file)
                        req.body.letter = req.file.filename;
                    return user.update(req.body)                        
                })
                .then(newuser => res.json({
                    ok: true,
                    data: newuser
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

router.put('/letterDestroy', autentica, function(req,res,next){
    sequelize.sync().then(()=>{
        Users.findOne({where: {id: req.body.id}})
        .then(user => user.update(req.body))
        .then(newuser=>res.json({
            ok: true,
            data: newuser
        }))
        .catch(error => res.json({
            ok: false,
            error: error + "error1"
        }))
    }).catch((error) => { //este catch?? de que es
        res.json({
            ok: false,
            error: error + "error2"
        })
    })
})

export default router;

