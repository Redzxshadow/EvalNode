const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app= express();
const groupeAr = require('./src/routes/groupeA');
const groupeBr = require('./src/routes/groupeB');
const groupeCr = require('./src/routes/groupeC');
const groupeDr = require('./src/routes/groupeD');
const groupeEr = require('./src/routes/groupeE');
const groupeFr = require('./src/routes/groupeF');

app.use(bodyParser.json())

app.get('/',(request,response) =>{
    response.send("Ca marche, tape dans tes mains")
})

app.use(groupeAr)
app.use(groupeBr)
app.use(groupeCr)
app.use(groupeDr)
app.use(groupeEr)
app.use(groupeFr)

app.get('/', (request, response)=>{
    response.send("casse ta grosse daronne tu t'affiches jamais")
}
)

module.exports = app;
