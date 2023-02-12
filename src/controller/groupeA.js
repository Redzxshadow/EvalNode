//Déclaration d'une constante pour appeler le package FS qui permet de lire les tableaux au format JSON
const fs = require('fs')

//Création de la fonction "getByType"
exports.getByType=(req,res) => {
    fs.readFile("./src/model/data.json", (err,data) => {
        //En cas d'erreur de la lecture, retourne le message d'erreur
        if (err){
            res.status(500).json({
                message: "t'es nul bouffon",
                error: err
            });
        } 
        //Si la lecture se passe bien, affiche le tableau qui se nomme "groupeA"
        else {
            res.status(200).json(JSON.parse(data).groupeA)
        }
    })
}

//Création de la fonction "getTypeByID"
exports.getTypeById=(req,res) => {
    //Même début que pour le getByType, tentative de lecture du tableau
    fs.readFile("./src/model/data.json",(err,data)=>{
        //Si erreur dans la lecture, retour du message d'erreur
        if (err){
            res.status(500).json({
            message: "Ca lis pas espece de sombre idiot",
            error: err
           })
        }
        //Si lecture réussie, suite
        else {
            //On déclare des constantes pour trouver la donnée qui correspond a l'ID voulu
            const manip_data = JSON.parse(data);  
            const data_id = manip_data.groupeA.find(
                (obj) => obj.id === parseInt(req.params.id)
            )        
        
            //Si l'ID existe et est trouvé, la renvoie
            if (data_id){
                res.status(200).json(data_id)
        }
            //Si elle n'existe pas renvoie une erreur
            else{
                res.status(404).json({
                    message:"Ya pas cette ID gros débile",
                    error:err
            })
        }
    }
  })
}

//Création de la fonction "updateData"
exports.updateData= (request, response) => {
    //Lecture du tableau de la même façon que précédemment
    fs.readFile("./src/model/data.json", (err,data)=>{
        //Toujours en cas d'erreur de lecture du tableau, affichage du message d'erreur
        if (err) {
                response.status(500).json({
                message : "YA PAS WESHHHHH",
                error: err,
            })
        //Si lecture correcte :
        } else {
        //Déclaration de constantes associées a l'ID
            const existing_data = JSON.parse(data);
            const data_id = existing_data.groupeA.find(
            (obj) => obj.id === parseInt(request.params.id)
        );
                //Si l'ID demandé n'existe pas
                if (!data_id) {
                    response.status(404).json({
                    message: "Ya pas cet ID dans ce groupe gros malin",
                    error: err,
        })
                //S'il existe en revanche
                } else {
            //Déclaration d'une constante qui change le nom de la data associée a l'ID par le nom que nous écrivons dans le Body
                    data_id.name=request.body.name;
                    fs.writeFile("./src/model/data.json", JSON.stringify(existing_data),(writeErr) => {
                    //Si l'écriture échoue
                    if (writeErr) {
                        response.status(500).json({
                        message: "Ca a pas réécris, recommence stp!",
                        error: err
            })
                    //Si ca se passe correctement, réécriture de la donnée
                    } else {
                        response.status(200).json({
                        message: "Ah nan bravo, ca a réécris, gg wp!"
            })
        }
    })
        }
    }
})
}

//Création de la fonction "DeleteByID" 
exports.DeleteById=(req, res)=>{
    //Lecture du fichier data.json comme depuis tout a l'heure
    fs.readFile("./src/model/data.json",(err,data)=>{
    //Toujours en cas d'erreur de lecture
    if (err){
        res.status(500).json({
            message:"Ya erreur sur la lecture, Johnny",
            error:err
        })
        //Toujours si la lecture est bonne
    }   else{
            //Déclaration des mêmes constantes associées a l'ID
            const existing_data=JSON.parse(data);
            const data_id= existing_data.groupeA.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
            //Toujours si l'ID n'existe pas
            if(!data_id){
                res.status(404).json({
                    message:"id non trouvé avec cet objet",
                    error:err
            })
            //PAR CONTRE, SI ELLE EXISTE
    }       else{
                existing_data.groupeA=existing_data.groupeA.filter(
                    (obj)=> obj.id != parseInt(request.params.id));
                fs.writeFile("./src/model/data.json",JSON.stringify(existing_data),
                    (writeErr)=>{
                        //Si la suppression échoue
                        if (writeErr) {
                            res.status(500).json({
                                message:"Erreur lors de la suppression, pas le couteau le plus aiguisé du tiroir toi",
                                error:err
                        })
                        //Si la suppression réussie
                        }   else {
                                res.status(200).json({
                                message:"Supression successfull, on rentre a la base"
                        })
                    }
                })
            }
        }
    })
}

//Création de la fonction "CreateData"
exports.CreateData=(request,response)=> {
    //Lecture du data.json encore une fois
    fs.readFile("./src/model/data.json",(err,data)=>{
        //Si erreur de lecture
        if(err){
            response.status(500).json({
                message:"Ca lis aussi bien qu'un aveugle la",
                error: err
            })
        //Si lecture réussie
        } else {
            //Declaration des constantes
            const existing_data= JSON.parse(data);
            //Push qui permet d'inclure au tableau la data rentrée dans le body
            existing_data.groupeA.push(request.body);
            fs.writeFile("./src/model/data.json",JSON.stringify(existing_data),(writeErr)=>{
                //Si erreur lors de l'écriture
                if(writeErr){
                    response.status(500).json({
                        message:"Ca marche pas...",
                        error: err
                    })
                //Si l'écriture est un succès
            } else{
                response.status(200).json({
                    message:"Ecriture réussie, bien joué spetznas"
                })
            }
        })
        }
    })
}
