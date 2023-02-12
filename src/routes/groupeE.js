//Voir groupeA.js dans le dossier routes
const express = require('express');
const router = express.Router();
const groupeEController= require("../controller/groupeE")

router.get("/data/groupeE",groupeEController.getByType);

router.get("/data/groupeE/:id",groupeEController.getTypeById);

router.put("/data/groupeE/:id",groupeEController.updateData);

router.delete("/data/groupeE/:id",groupeEController.DeleteById);

router.post("/data/groupeE",groupeEController.CreateData);



module.exports = router;