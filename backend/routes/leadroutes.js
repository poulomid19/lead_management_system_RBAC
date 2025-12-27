const express = require("express")
const router = express.Router()
const authCheck = require("../middleware/authMiddleware")
const roleAllowed = require("../middleware/roleMiddleware")
const {createLead, getLeads, getLeadsbyId, updateLeadStatus, deleteLead} = require("../controller/leadController")
router.use(authCheck)

//create lead (user/admin)
router.post("/", createLead)

//get leads (user: own /admin: all)
router.get("/", getLeads)

//get lead by id (user: own /admin: all)
router.get("/:id", getLeadsbyId)

//update status (admin only)
router.patch("/:id/status", roleAllowed("admin"), updateLeadStatus)

//delete lead (admin only)
router.delete("/:id", roleAllowed("admin"), deleteLead)

module.exports = router