//Voir groupeA.js dans le dossier routes
const express = require('express');
const router = express.Router();
const groupeFController= require("../controller/groupeF")

router.get("/data/groupeF",groupeFController.getByType);

router.get("/data/groupeF/:id",groupeFController.getTypeById);

router.put("/data/groupeF/:id",groupeFController.updateData);

router.delete("/data/groupeF/:id",groupeFController.DeleteById);

router.post("/data/groupeF",groupeFController.CreateData);



module.exports = router;