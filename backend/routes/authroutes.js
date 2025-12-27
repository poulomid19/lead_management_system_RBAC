const express = require("express")
const router = express.Router()
const {register, login, logout, restoreAuth} = require("../controller/authController")
const authMiddle = require("../middleware/authMiddleware")

router.post("/register", register)
router.post("/login", login)
router.post("/logout",logout)
router.get("/me", authMiddle, restoreAuth);

module.exports = router
