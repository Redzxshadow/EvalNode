//Pour toute la partie commentaire, se référer au groupeA.js dans le dossier controller, les codes sont intrinsèquements les mêmes
const fs = require('fs')

exports.getByType=(req,res) => {
    fs.readFile("./src/model/data.json", (err,data) => {
        if (err){
            res.status(500).json({
                message: "t'es nul mon gars",
                error: err
            });
        } 
        else {
            res.status(200).json(JSON.parse(data).groupeB)
        }
    })
}

exports.getTypeById=(request,response) => {
    fs.readFile("./src/model/data.json",(err,data)=>{
        if (err){
            response.status(500).json({
            message: "Ca lis pas espece de sombre con",
            error: err
           })
        }
        else {
            const manip_data = JSON.parse(data);  
            const data_id = manip_data.groupeB.find(
                (obj) => obj.id === parseInt(req.params.id)
            )        
        

        if (data_id){
            response.status(200).json(data_id)
        }
        else{
            response.status(404).json({
                message:"Ya pas cette ID mon reuf",
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
                message : "Ca a pas luuu",
                error: err,
            })
        } else {
        const existing_data = JSON.parse(data);
        const data_id = existing_data.groupeB.find(
        (obj) => obj.id === parseInt(request.params.id)
        );
        if (!data_id) {
        response.status(404).json({
        message: "Tu t'es trompé dans l'ID, CORRIGE",
        error: err,
        })
    } else {
        data_id.name=request.body.name;
        fs.writeFile("./src/model/data.json", JSON.stringify(existing_data),(writeErr) => {
        if (writeErr) {
            response.status(500).json({
                message: "T'es pas Emile Zola.. L'écriture c'est pas ton truc..",
                error: err
            })
        } else {
            response.status(200).json({
                message: "BIEN JOUEEEE!"
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
            message:"Toujours pas... tu les enchaînes...",
            error:err
        })
    }   else{
            const existing_data=JSON.parse(data);
            const data_id= existing_data.groupeB.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
        if(!data_id){
            response.status(404).json({
                message:"Pas d'Idée.. (ID, Idée..)",
                error:err
            })
    }   else{
            existing_data.groupeB=existing_data.groupeB.filter(
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
                message:"La lecture..  La lecture..",
                error: err
            })
        } else {
            const existing_data= JSON.parse(data);
            existing_data.groupeB.push(request.body);
            fs.writeFile("./src/model/data.json",JSON.stringify(existing_data),(writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message:"La data est pas la.",
                        error: err
                    })
            } else{
                response.status(200).json({
                    message:"La data est la."
                })
            }
        })
        }
    })
}