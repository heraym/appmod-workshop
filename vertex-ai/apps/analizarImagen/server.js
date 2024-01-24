const fs = require("fs");
 


const http = require('http');
const hostname = '0.0.0.0';
const port = process.env.PORT ||3000; 
var express = require('express');
const cors = require('cors');
var formidable = require('formidable');

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('.'));

app.set("view engine", "ejs");

const server = http.createServer(app);

var imagen = "./images/imagen1.jpg";
var mimeType = 'image/jpeg';
var prompt = "what is shown in this image?";
  
  app.get('/', function(req,res,next) {
     res.render("analizar-imagen",{ imagen: imagen, prompt: prompt});
  });
  app.get('/analizar-imagen', function(req,res,next) {
      res.render("analizar-imagen",{ imagen: imagen, prompt: prompt});
  });

  app.get('/analizar-imagen-query', async function(req,res,next) {

   prompt = req.query.prompt;
   
     // Generar Texto con AI 
 
    res.send("Texto generado por AI");
  });
  
  app.post('/fileupload', function(req,res,next) {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
          var oldpath = files.filetoupload[0].filepath;
          var newpath = 'images/' + files.filetoupload[0].originalFilename;
          mimeType = files.filetoupload[0].mimetype;
          imagen = newpath;
        fs.copyFile(oldpath, newpath, function (err) {
          if (err) throw err;
          res.render("analizar-imagen",{ imagen: imagen});
        }); 
    });
  });
   

  server.listen(port, hostname, () => {
    console.log('Server running at http://%s:%s/', hostname, port);
});
