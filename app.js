const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const config = require('./config/db');
const passport = require('passport');

const app = express();

const proyectos = require('./routes/proyectos');
const productos = require('./routes/productos');
const prestamos = require('./routes/prestamos');
const balances = require('./routes/balances');
const productoszonasproyectos = require('./routes/productoszonasproyectos');
const notificaciones = require('./routes/notificaciones');
const admins = require('./routes/admins');
const zonas = require('./routes/zonas');
const maquinarias = require('./routes/maquinarias');
const proyectoproducto = require('./routes/proyectosproductos');
const usuarios = require('./routes/usuarios');
const demandas = require('./routes/demandas');
const maquinariasCompradas = require('./routes/maquinariasCompradas');
const usuariosmaquinarias = require('./routes/usuariosmaquinarias');
const usuariosproductos = require('./routes/usuariosproductos');
const usuariosproductoszonas = require('./routes/usuariosproductoszonas');
const operaciones = require('./routes/operaciones');
const pdfs = require('./pdfs');

const port = 3000;

app.use(cors());

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Paerser
app.use(bodyparser.json());

//passport midleware

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/producto', productos);
app.use('/usuariosmaquinarias',usuariosmaquinarias);
app.use('/usuariosproductos',usuariosproductos);
app.use('/usuariosproductoszonas',usuariosproductoszonas);
app.use('/proyectoproducto', proyectoproducto);
app.use('/maquinariacomprada',maquinariasCompradas);
app.use('/demanda', demandas);
app.use('/balance', balances);
app.use('/admin', admins);
app.use('/productoszonasproyectos', productoszonasproyectos);
app.use('/prestamo', prestamos);
app.use('/usuario', usuarios);
app.use('/zona', zonas);
app.use('/notificacion', notificaciones);
app.use('/proyecto', proyectos);
app.use('/maquinaria', maquinarias);
app.use('/operacion', operaciones);
app.use('/pdf',pdfs);

app.get('/', (req, res)=> {
  res.send("Invalid Endpoint");
});

app.listen(port, () => {
  console.log("Server started on " + port);
});
