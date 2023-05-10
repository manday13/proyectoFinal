//import express and controllers
import express from "express";
import cors from "cors";

import indexRouter from './rutas/indexRouter.js'
import usersRouter from './rutas/usersRouter.js'
import volunteersRouter from './rutas/volunteersRouter.js'
import tutorRouter from './rutas/tutorRouter.js'
import competenciesRouter from './rutas/competenciesRouter.js'
import servicesRouter from './rutas/servicesRouter.js'
import usersServicesRouter from './rutas/usersServicesRouter.js'

//instanciamos nueva aplicación express
const app = express()

//necesario para poder recibir datos en json
app.use(express.json());
app.use(cors());
/* app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json()) */

//las llamadas que se hagan a ciertas rutas las derivamos a componentes especificos donde pondrá qué es lo que se tendrá que hacer segun el metodo que se pida

app.use('/', indexRouter);
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/services', servicesRouter);
app.use('/api/competencies', competenciesRouter);
app.use('/api/tutor', tutorRouter);
app.use('/api/usersServices', usersServicesRouter);


//para cuando se le pida algo y no lo encuentre que busque en la carpeta fotos:
app.use(express.static("fotos"));




const port = 5000
app.listen(port, ()=> console.log("App listening on port" + port + "!"))