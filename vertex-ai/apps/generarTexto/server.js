/**
 * TODO(developer): Uncomment these variables before running the sample.\
 * (Not necessary if passing values as arguments)
 */


const http = require('http');
const hostname = '0.0.0.0';
const port = process.env.PORT ||3000; 
var express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('.'));

app.set("view engine", "ejs");

const server = http.createServer(app);

var textoPrompt = "Give me ten interview questions for the role of program manager.";

app.get('/', function(req,res,next) {
  res.render("generar-texto",{ prompt: textoPrompt});
});

app.get('/generar-texto', function(req,res,next) {
    res.render("generar-texto",{ prompt: textoPrompt});
});

app.get('/generar-texto-query', async function(req,res,next) {

textoPrompt = req.query.prompt;

  // Generar Texto con AI 
  res.send("Texto generado por AI");
});

server.listen(port, hostname, () => {
    console.log('Server running at http://%s:%s/', hostname, port);
});
 