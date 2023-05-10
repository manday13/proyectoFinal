//se importa la librería jsonwebtoken para manejar los token
import jsonwebtoken from 'jsonwebtoken';

//importamos la clave secretkey con la que se ha generado la signature key que sirve para verificar que sea verdadero el token
import {secretKey} from './loginconfig.js';

//creamos funcion para comprobar que el token sea correcto/veridico y que no haya caducado
export const autentica = (req,res,next) => {
    //obtenemos el token del headers que es de donde se manda del front
    let token = req.headers.authorization || '';

    //si el token está ausente, responde con un error (hay errores correspondientes para cada caso, en este es el 401: unauthorized) y un mensaje
    if(!token){
        res.status(401).json({ok: false, error: 'token absent'})
        // return;
    }

    //ahora tenemos el caso de que sí que haya token, por lo que nos toca verificarlo
    jsonwebtoken.verify(token, secretKey, (error,decoded) =>{
        //si hay un error en la verificacion, como antes responde con un error pero el mensaje sera distinto esta vez
        if(error){
            res.status(401).json({ok: false, error: 'token invalid'});
        } else { //si la verificacion es correcta, nos toca comprobar que el token no haya caducado
            const {expiredAt} = decoded; //aqui lo que hacemos es que del token extraemos la informacion que contiene (la decidimos nosotros), en este caso nos interesa en que momento caduca
            if (expiredAt > new Date().getTime()){
                next(); //si no ha caducado, permite que se haga la funcion definida en el back que se esta solicitando hacer desde el front
            } else {
                res.status(401).json({ok: false, error: 'token caducat'});
            }
        }
    });
};