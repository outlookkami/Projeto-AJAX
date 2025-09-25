const bodyParser = require("body-parser"); // biblioteca que acabamos de instalar 
const express = require("express"); // biblioteca que acabamos de instalar
const serv = express(); // criar o servidor do app da biblioteca express

//bibliotecas instaladas com os comandos no command prompt:  
// npm init -y
// npm install body-parser express multer nodemon

serv.use(express.static('.')); // criar o servidor
serv.use(bodyParser.urlencoded({
    extended: true

}));

serv.use(bodyParser.json()); // middleware para ler dados do corpo da requisição (formulários)
const multer = require("multer"); // middleware para lidar com uploads de arquivos

const storage = multer.diskStorage({

    destination: function(req, file, callback){
        callback(null, './upload')
    },

    filename: function(req, file, callback){
        callback(null, '${Date.now()}_${file.originalname}')
    }

}) // Rota post que recebe um arquivo 

const upload = multer({storage}).single('arquivo'); // para salvar o arquivo no destino correto

serv.post('/upload', (req, res) => {

    upload(req, res, err => {
        if(err){
            return res.end('Ocorreu um erro.')
        }

        res.end('Concluído com sucesso.')
    })
})

serv.listen(8080, () => 
    console.log('Executando...')
) // coloca o servidor para rodar na porta 8080.

