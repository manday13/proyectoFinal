//import express and controllers
import express from "express";
import cors from "cors";
import { MessagePort } from "worker_threads";
import indexRouter from './rutas/indexRouter.js'

//instanciamos nueva aplicación express
const app = express()

//necesario para poder recibir datos en json
app.use(express.json());
app.use(cors());


//las llamadas que se hagan a ciertas rutas las derivamos a componentes especificos donde pondrá qué es lo que se tendrá que hacer segun el metodo que se pida

app.use('/', indexRouter);


//para cuando se le pida algo y no lo encuentre que busque en la carpeta fotos:
app.use(express.static("fotos"));




const port = 5000
app.listen(port, ()=> console.log("App listening on port" + port + "!"))