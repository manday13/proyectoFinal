
import express from 'express';//siempre importamos express que es la libreria que se encarga de recibir y enviar
import jsonwebtoken from 'jsonwebtoken'; // para la creacion del token cuando se logeen
import multer from 'multer'; //para poder trabajar con archivos (en nuestro caso imagenes)
import {secretKey, expiredAfter} from './loginconfig.js' //importamos estos datos que usaremos en la creacion del token cuando se logeen
import bcrypt from 'bcrypt'; //se utiliza para encriptar cosas, en nuestro caso la contraseña del usuario 
import {sequelize} from '../loadSequelize.js'; //para conectar con la base de datos
import {autentica} from './authentication.js'; //para que cada vez que se intente hacer algo se compruebe si se ha caducado el token o no para hacerlo o no hacerlo

//importar aqui modelo!!

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
        res.status(400).json({ok:false, msg: "email o password not received"})
    }
    Users.findOne({where: {email}})
        .then((user)=> {
            if (user && bcrypt.compareSync(password, user.password)){
                return user;
            } else {
                throw "client/password invalids"; //deja de hacer el resto
            }
        })
        .then(user => { //si todo ha ido bien, es decir coincide el user con su password, crea el token que es el que le permitira acceder a los sitios de la pagina
            response.token = jsonwebtoken.sign(
                { //aqui ponemos la informacion que queremos meter dentro que se puede extraer
                    expiredAt: new Date().getTime() + expiredAfter, //para que caduque en el momento en el que pase el tiempo que hemos definido en expiredafter
                    email,
                    name: user.nombre,
                    id,
                },
                secretKey //finalmente ponemos una signature key que nos sirve para que el token sea unico
            ); //hasta aqui la creacion del token
            response.ok = true;
            res.json(response);
        })
        .catch(err => res.status(400).json({ok: false, msg: err}))
});

