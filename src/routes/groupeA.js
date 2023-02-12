//Déclaration des constantes de express
const express = require('express');
const router = express.Router();
//Déclaration de la constante pour aller chercher les scripts présent dans le contrôleur
const groupeAController= require("../controller/groupeA")

//Appel de la fonction "getByType" a la séléction de Get (Exemple : get - http://localhost:3000/groupeA)
router.get("/data/groupeA",groupeAController.getByType);
//Appel de la fonction "getTypeById" a la séléction de Get (Exemple : get - http://localhost:3000/groupeA/1)
router.get("/data/groupeA/:id",groupeAController.getTypeById);
//Appel de la fonction "updateData" a la séléction de Put
router.put("/data/groupeA/:id",groupeAController.updateData);
//Appel de la fonction "DeleteByID" a la séléction de Delete
router.delete("/data/groupeA/:id",groupeAController.DeleteById);
//Appel de la fonction "CreateData" a la séléction de Post
router.post("/data/groupeA",groupeAController.CreateData);



module.exports = router;