//Pour toute la partie commentaire, se référer au groupeA.js dans le dossier controller, les codes sont intrinsèquements les mêmes
const fs = require('fs')

exports.getByType=(req,res) => {
    fs.readFile("./src/model/data.json", (err,data) => {
        if (err){
            res.status(500).json({
                message: "Ca lis pas (j'ai plus d'idée)",
                error: err
            });
        } 
        else {
            res.status(200).json(JSON.parse(data).groupeD)
        }
    })
}

exports.getTypeById=(req,res) => {
    fs.readFile("./src/model/data.json",(err,data)=>{
        if (err){
            res.status(500).json({
            message: "Ca lis pas",
            error: err
           })
        }
        else {
            const manip_data = JSON.parse(data);  
            const data_id = manip_data.groupeD.find(
                (obj) => obj.id === parseInt(req.params.id)
            )        
        

        if (data_id){
            res.status(200).json(data_id)
        }
        else{
            res.status(404).json({
                message:"Ya pas l'ID",
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
                message : "Pas lu",
                error: err,
            })
        } else {
        const existing_data = JSON.parse(data);
        const data_id = existing_data.groupeD.find(
        (obj) => obj.id === parseInt(request.params.id)
        );
        if (!data_id) {
        response.status(404).json({
        message: "Il n'y a pas cette ID dans ce tableau",
        error: err,
        })
    } else {
        data_id.name=request.body.name;
        fs.writeFile("./src/model/data.json", JSON.stringify(existing_data),(writeErr) => {
        if (writeErr) {
            response.status(500).json({
                message: "Réecriture échouée",
                error: err
            })
        } else {
            response.status(200).json({
                message: "Réecriture réussie"
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
            message:"Pas lu",
            error:err
        })
    }   else{
            const existing_data=JSON.parse(data);
            const data_id= existing_data.groupeD.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
        if(!data_id){
            response.status(404).json({
                message:"Pas cette ID",
                error:err
            })
    }   else{
            existing_data.groupeD=existing_data.groupeD.filter(
                (obj)=> obj.id != parseInt(request.params.id));
            fs.writeFile("./src/model/data.json",JSON.stringify(existing_data),
                (writeErr)=>{
                    if (writeErr) {
                        response.status(500).json({
                            message:"Pas supprimé",
                            error:err
                        })
                    }   else {
                            response.status(200).json({
                            message:"Supprimé"
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
                message:"Pas lu",
                error: err
            })
        } else {
            const existing_data= JSON.parse(data);
            existing_data.groupeD.push(request.body);
            fs.writeFile("./src/model/data.json",JSON.stringify(existing_data),(writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message:"Pas écrit",
                        error: err
                    })
            } else{
                response.status(200).json({
                    message:"Donnée ajoutée"
                })
            }
        })
        }
    })
}