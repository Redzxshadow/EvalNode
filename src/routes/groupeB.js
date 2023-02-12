//Voir groupeA.js dans le dossier routes
const express = require('express');
const router = express.Router();
const groupeBController= require("../controller/groupeB")

router.get("/data/groupeB",groupeBController.getByType);

router.get("/data/groupeB/:id",groupeBController.getTypeById);

router.put("/data/groupeB/:id",groupeBController.updateData);

router.delete("/data/groupeB/:id",groupeBController.DeleteById);

router.post("/data/groupeB",groupeBController.CreateData);



module.exports = router;