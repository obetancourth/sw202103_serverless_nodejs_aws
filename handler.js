const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/add/:int1/:int2" , (req, res, next) => {
  const {int1, int2} = req.params;
  const result = parseInt(int1) + parseInt(int2);
  return res.status(200).json(
    {int1: parseInt(int1), int2: parseInt(int2), resultado: result}
  );
});

app.post("/new", (req, res, next)=>{
  const {email, pswd, secret} = req.body;
  // vamos a agregarlos a alguna persistencia -- DynamoDB  --MongoDb Atlas
  return res.status(200).json(
    {
      "email" : email,
      "password": pswd,
      "secret" : secret,
      "time": new Date().getTime() //new Date().toISOString()
    }
  );
});

app.put("/update/:id" , (req, res, next)=>{
  const {id} = req.params;
  const { email, pswd, secret } = req.body;

  // actualizar el recursos de la persistencia
  return res.status(200).json(
    {
      "id": id,
      "email": email,
      "password": pswd,
      "secret": secret,
      "time": new Date().getTime() //new Date().toISOString()
    }
  );
});

app.delete("/delete/:id", (req, res, next)=>{
  const {id} = req.params;
  // en la persistencia se debe borrar el recurso identificado
  return res.status(200).json(
    {
      "id": id,
      "time": new Date().getTime() //new Date().toISOString()
    }
  );
});

app.post("/conjunto", (req, res, next)=>{
  const rangostr = req.body.rango;
  let arrTuplas = rangostr.replace(/[\[\]]/g, "").split(";");
  //eliminar los corechetes
  //separar por ,
  // generar el conjunto unico
  // devolver el json
  return res.status(200).json({rango: arrTuplas});
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});
// json.org


//REST API  -> Trasferencia de Estado Representacional

// 200 -- OK
// 300x -- Redireccionamientos 302
// 400x -- No se puede acceder al recurso 401 - no autorizado, 404 - no existe recurso 403 - No Implementado
// 500x -- Excepcion no controlada sepa Juarez que sucedio.  - 501
//json
//parametros en la url  != query parameters
// req.params http://localhost:3000/sum/10/20
// req.query  http://localhost:3000/sum?int1=10&int2=20

//GET     -> Consulta
//POST    -> Crear
//PUT     -> Actualizar
//DELETE  -> Eliminar


module.exports.handler = serverless(app);
