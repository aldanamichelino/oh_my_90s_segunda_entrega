const express = require('express');
const apiRoutes = require('./routers/index');
const app = express();
const { env: {PORT} } = require('./config');

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api', apiRoutes);

app.get('*', function(req, res){
    res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
  });


//Port connection
const connectedServer = app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});
  
connectedServer.on('error', (error) => {
    console.error('Error: ', error);
});