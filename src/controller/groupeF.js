//Pour toute la partie commentaire, se référer au groupeA.js dans le dossier controller, les codes sont intrinsèquements les mêmes
const fs = require('fs')

exports.getByType=(req,res) => {
    fs.readFile("./src/model/data.json", (err,data) => {
        if (err){
            res.status(500).json({
                message: "t'es claqué",
                error: err
            });
        } 
        else {
            res.status(200).json(JSON.parse(data).groupeF)
        }
    })
}

exports.getTypeById=(req,res) => {
    fs.readFile("./src/model/data.json",(err,data)=>{
        if (err){
            res.status(500).json({
            message: "Erreur frérito",
            error: err
           })
        }
        else {
            const manip_data = JSON.parse(data);  
            const data_id = manip_data.groupeF.find(
                (obj) => obj.id === parseInt(req.params.id)
            )        
        

        if (data_id){
            res.status(200).json(data_id)
        }
        else{
            res.status(404).json({
                message:"Manque d'ID",
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
                message : "Palu",
                error: err,
            })
        } else {
        const existing_data = JSON.parse(data);
        const data_id = existing_data.groupeF.find(
        (obj) => obj.id === parseInt(request.params.id)
        );
        if (!data_id) {
        response.status(404).json({
        message: "Pas l'ID",
        error: err,
        })
    } else {
        data_id.name=request.body.name;
        fs.writeFile("./src/model/data.json", JSON.stringify(existing_data),(writeErr) => {
        if (writeErr) {
            response.status(500).json({
                message: "C'est raté",
                error: err
            })
        } else {
            response.status(200).json({
                message: "Elle a trop changée.. ta data.."
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
            message:"Palu",
            error:err
        })
    }   else{
            const existing_data=JSON.parse(data);
            const data_id= existing_data.groupeF.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
        if(!data_id){
            response.status(404).json({
                message:"pas cette ID",
                error:err
            })
    }   else{
            existing_data.groupeF=existing_data.groupeF.filter(
                (obj)=> obj.id != parseInt(request.params.id));
            fs.writeFile("./src/model/data.json",JSON.stringify(existing_data),
                (writeErr)=>{
                    if (writeErr) {
                        response.status(500).json({
                            message:"Pas supprimée",
                            error:err
                        })
                    }   else {
                            response.status(200).json({
                            message:"Supprimée"
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
                message:"Erreur chacal",
                error: err
            })
        } else {
            const existing_data= JSON.parse(data);
            existing_data.groupeF.push(request.body);
            fs.writeFile("./src/model/data.json",JSON.stringify(existing_data),(writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message:"Erreur chacal lors de l'ecriture",
                        error: err
                    })
            } else{
                response.status(200).json({
                    message:"data ajoutée avec succes, Yay"
                })
            }
        })
        }
    })
}