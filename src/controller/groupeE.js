//Pour toute la partie commentaire, se référer au groupeA.js dans le dossier controller, les codes sont intrinsèquements les mêmes
const fs = require('fs')

exports.getByType=(req,res) => {
    fs.readFile("./src/model/data.json", (err,data) => {
        if (err){
            res.status(500).json({
                message: "Erreur de lecture",
                error: err
            });
        } 
        else {
            res.status(200).json(JSON.parse(data).groupeE)
        }
    })
}

exports.getTypeById=(req,res) => {
    fs.readFile("./src/model/data.json",(err,data)=>{
        if (err){
            res.status(500).json({
            message: "toujours pas lu",
            error: err
           })
        }
        else {
            const manip_data = JSON.parse(data);  
            const data_id = manip_data.groupeE.find(
                (obj) => obj.id === parseInt(req.params.id)
            )        
        

        if (data_id){
            res.status(200).json(data_id)
        }
        else{
            res.status(404).json({
                message:"La c'est lu, mais ton ID est fausse, réessaie",
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
        const data_id = existing_data.groupeE.find(
        (obj) => obj.id === parseInt(request.params.id)
        );
        if (!data_id) {
        response.status(404).json({
        message: "Pas d'ID",
        error: err,
        })
    } else {
        data_id.name=request.body.name;
        fs.writeFile("./src/model/data.json", JSON.stringify(existing_data),(writeErr) => {
        if (writeErr) {
            response.status(500).json({
                message: "Ca a pas écrit",
                error: err
            })
        } else {
            response.status(200).json({
                message: "Ecriture réussie"
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
            const data_id= existing_data.groupeE.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
        if(!data_id){
            response.status(404).json({
                message:"Pas cette ID",
                error:err
            })
    }   else{
            existing_data.groupeE=existing_data.groupeE.filter(
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
                            message:"Hitman s'en est occupé, la suppression est effectuée"
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
                message:"FAUX",
                error: err
            })
        } else {
            const existing_data= JSON.parse(data);
            existing_data.groupeE.push(request.body);
            fs.writeFile("./src/model/data.json",JSON.stringify(existing_data),(writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message:"Ca marche pas",
                        error: err
                    })
            } else{
                response.status(200).json({
                    message:"La ca marche par contre"
                })
            }
        })
        }
    })
}