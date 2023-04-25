import express from 'express';

//creo un objeto en el que se guardan las peticiones
const router = express.Router();

router.get('/', function(req,res,next){
    res.send("<br>¡Bienvenido a la API de my_first_ecommerce! <br> <ul> Añada:  <b>/api/...</b> si quiere ver ... ");
});

export default router;