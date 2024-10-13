const express = require('express');
const app = express();

app.use(express.json());

function monitorarRequisicoes(request, response, next) {
    const { method, url, params, body, query } = request;

    const texto = `[${method} - ${url} - params: ${JSON.stringify(params)}
    - body: ${JSON.stringify(body)} - query: ${JSON.stringify(query)}]`;

    console.log(texto);
    return next();
}

app.use(monitorarRequisicoes);

app.get('/disciplinas', (request, response) => {
    const query = request.query;
    return response.json(query);
});


app.post('/disciplinas', monitorarRequisicoes, (request, response) => {
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