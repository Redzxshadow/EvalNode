//Voir groupeA.js dans le dossier routes
const express = require('express');
const router = express.Router();
const groupeCController= require("../controller/groupeC")

router.get("/data/groupeC",groupeCController.getByType);

router.get("/data/groupeC/:id",groupeCController.getTypeById);

router.put("/data/groupeC/:id",groupeCController.updateData);

router.delete("/data/groupeC/:id",groupeCController.DeleteById);

router.post("/data/groupeC",groupeCController.CreateData);



module.exports = router;