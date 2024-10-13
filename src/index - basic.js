const express = require('express');
const app = express();

app.use(express.json());
/*
app.get('/disciplinas', (request, response) => {
    return response.json({
        message: "Olá Mundo!"
    });
});
*/
app.get('/disciplinas', (request, response) => {
    const query = request.query;
    return response.json(query);
});


/*
app.post('/disciplinas', (request, response) => {
    return response.json({
        message: "Nessa Rota devo adicionar uma disciplina!"
    });
});
*/
app.post('/disciplinas', (request, response) => {
    const body = request.body;
    return response.json(body);
});
/*
app.put('/disciplinas', (request, response) => {
    return response.json({
        message: "Nessa Rota devo modificar uma disciplina!"
    });
});
*/
/*
app.put('/disciplinas/:id', (request, response) => {
    const params = request.params;

    return response.json(params);
});
*/
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