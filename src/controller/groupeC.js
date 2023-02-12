//Pour toute la partie commentaire, se référer au groupeA.js dans le dossier controller, les codes sont intrinsèquements les mêmes
const fs = require('fs')

exports.getByType=(req,res) => {
    fs.readFile("./src/model/data.json", (err,data) => {
        if (err){
            res.status(500).json({
                message: "t'es nul mec",
                error: err
            });
        } 
        else {
            res.status(200).json(JSON.parse(data).groupeC)
        }
    })
}

exports.getTypeById=(req,res) => {
    fs.readFile("./src/model/data.json",(err,data)=>{
        if (err){
            res.status(500).json({
            message: "Ca lis pas espece de sombre ornythorinque",
            error: err
           })
        }
        else {
            const manip_data = JSON.parse(data);  
            const data_id = manip_data.groupeC.find(
                (obj) => obj.id === parseInt(req.params.id)
            )        
        

        if (data_id){
            res.status(200).json(data_id)
        }
        else{
            res.status(404).json({
                message:"Ya pas cette ID frérot",
                error:err
            })
        }
    }
  })
}

exports.updateData= (request, response) => {
    fs.readFile("./src/model/data.json", (err,data)=>{
        if (err) {
            response.status(500).json({
                message : "palu+menfou",
                error: err,
            })
        } else {
        const existing_data = JSON.parse(data);
        const data_id = existing_data.groupeC.find(
        (obj) => obj.id === parseInt(request.params.id)
        );
        if (!data_id) {
        response.status(404).json({
        message: "Ton ID est pas dans ce tableau",
        error: err,
        })
    } else {
        data_id.name=request.body.name;
        fs.writeFile("./src/model/data.json", JSON.stringify(existing_data),(writeErr) => {
        if (writeErr) {
            response.status(500).json({
                message: "Faut aller a l'école mon bro, l'écriture est pas bonne",
                error: err
            })
        } else {
            response.status(200).json({
                message: "C'est écrit"
            })
        }
    })
        }
    }
})
}
exports.DeleteById=(request, response)=>{
    fs.readFile("./src/model/data.json",(err,data)=>{
    if (err){
        response.status(500).json({
            message:"J'arrive pas a lire, c'est du hiéroglyphe?",
            error:err
        })
    }   else{
            const existing_data=JSON.parse(data);
            const data_id= existing_data.groupeC.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
        if(!data_id){
            response.status(404).json({
                message:"L'ID est érronée",
                error:err
            })
    }   else{
            existing_data.groupeC=existing_data.groupeC.filter(
                (obj)=> obj.id != parseInt(request.params.id));
            fs.writeFile("./src/model/data.json",JSON.stringify(existing_data),
                (writeErr)=>{
                    if (writeErr) {
                        response.status(500).json({
                            message:"Ta data est aussi vivante que tonton Palmade (echec de suppression si tu preferes)",
                            error:err
                        })
                    }   else {
                            response.status(200).json({
                            message:"Il  a rejoint tonton Johnny"
                        })
                    }
                })
            }
        }
    })
}

exports.CreateData=(request,response)=> {
    fs.readFile("./src/model/data.json",(err,data)=>{
        if(err){
            response.status(500).json({
                message:"ERREUR BIP BOOP",
                error: err
            })
        } else {
            const existing_data= JSON.parse(data);
            existing_data.groupeC.push(request.body);
            fs.writeFile("./src/model/data.json",JSON.stringify(existing_data),(writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message:"Pas écrit",
                        error: err
                    })
            } else{
                response.status(200).json({
                    message:"Bien joué, bon format"
                })
            }
        })
        }
    })
}