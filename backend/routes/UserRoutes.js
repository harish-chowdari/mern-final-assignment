const express = require("express")
const router = express.Router()
const controller = require("../controller/controller")



router.post("/login", controller.postLogin)

 
router.get("/details", controller.getReq)



module.exports = router