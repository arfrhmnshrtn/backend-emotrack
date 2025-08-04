const express = require("express");
const router = express.Router();
const giziController = require("../controllers/giziController");

router.post("/save", giziController.SaveGizi);
router.get("/user/:user_id", giziController.getGiziByUser);
router.get("/detail/:id", giziController.getGiziById);

module.exports = router;
