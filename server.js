// Constante depuis "app.js"
const app = require ('./app')

const port = 3000

app.listen(port, ()=>{
    console.log ("l'appli tourne sur le port " + port);
})

