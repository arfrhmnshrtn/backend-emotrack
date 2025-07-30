const express = require("express");
const router = express.Router();
const jurnalController = require("../controllers/jurnalController");

router.post("/generate", jurnalController.jurnal);
router.get("/:user_id", jurnalController.getJurnals);
router.get("/detail/:id", jurnalController.getJurnalsById);

module.exports = router;
