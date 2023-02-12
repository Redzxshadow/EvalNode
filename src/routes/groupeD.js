//Voir groupeA.js dans le dossier routes
const express = require('express');
const router = express.Router();
const groupeDController= require("../controller/groupeD")

router.get("/data/groupeD",groupeDController.getByType);

router.get("/data/groupeD/:id",groupeDController.getTypeById);

router.put("/data/groupeD/:id",groupeDController.updateData);

router.delete("/data/groupeD/:id",groupeDController.DeleteById);

router.post("/data/groupeD",groupeDController.CreateData);



module.exports = router;