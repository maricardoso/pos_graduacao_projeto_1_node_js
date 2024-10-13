const express = require('express');
const multer = require('multer');
const uploadConfig = require('./upload/uploadconfig');
const { sign } = require('jsonwebtoken');

const app = express();
const uploadMiddleware = multer(uploadConfig);

app.use(express.json());
app.use('/imagens', express.static(uploadConfig.directory));

function monitorarRequisicoes(request, response, next) {
    const { method, url, params, body, query } = request;

    const texto = `[${method} - ${url} - params: ${JSON.stringify(params)}
    - body: ${JSON.stringify(body)} - query: ${JSON.stringify(query)}]`;

    console.log(texto);
    return next();
}

app.use('/disciplinas', monitorarRequisicoes);

app.post('/autenticacao', (request, response) => {
    const { email, senha} = request.body;

    // .. Validações quando ao e-mail e senha

    const idUsuario = "XPTO"

    const token = sign({
        //Não incluir informações sensíveis
        //Permissões, etc
    }, 'minha-chave-secreta', { 
        subject: idUsuario,
        expiresIn: '1d'
    });

    return response.json({token});
});

/* teste: 
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjg4NDM1MzUsImV4cCI6MTcyODkyOTkzNSwic3ViIjoiWFBUTyJ9.r1_WDmzB3W39Y_Sgdb3Lca6Z6l7W1pHB6jFCl8UgZK0"
}
*/

app.get('/disciplinas', (request, response) => {
    const query = request.query;
    return response.json(query);
});


app.post('/disciplinas', uploadMiddleware.single('avatar'),(request, response) => {
    const body = request.body;
    return response.json(body);
});

app.put('/disciplinas/:id', (request, response) => {
    const {id } = request.params;
    if (id !== "tecnologia" ){
        return response.status(400).json({
            message: "Disciplina não encontrada"
        })
    }

    return response.json({id});
});

app.delete('/disciplinas', (request, response) => {
    return response.json({
        message: "Nessa Rota devo remover uma disciplina!"
    });
});

app.listen(3000);