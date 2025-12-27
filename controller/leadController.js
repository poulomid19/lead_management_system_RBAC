const leadSchema = require("../models/lead")

//create lead
const createLead = async(req,res)=>{
      try {
        const {leadname, email, phone, source, message} = req.body
        if (!leadname || !email || !phone) {
        return res.status(400).json({message: "Lead name, email and phone are required"})
        }
          const leadData = {leadname, email, phone, source, message, userId: req.user.id}  //link leads to logged-in users
          const lead = await leadSchema.create(leadData)
          res.status(201).json({message:"Lead created successfully",lead})
    } catch (error) {
        res.status(500).json({message: "could not create lead", error})
    }
}

//get leads where admin can view all and user can see their own leads only
const getLeads = async(req,res)=>{
    try {
        const query = req.user.role==="admin"? {} : {userId : req.user.id}
        const leads = await leadSchema.find(query).sort({ createdAt: -1 })
        if(leads.length == 0) return res.status(200).json([])
        res.status(200).json(leads)    
    } catch (error) {
      res.status(500).json({message: "could not fetch lead", error}) 
    }
}

//get single lead by Id (admin: all, user: own lead only)
const getLeadsbyId = async(req,res)=>{
  try {
    const id = req.params.id
    const lead = await leadSchema.findById(id)
    if(!lead) return res.status(404).json({message: "no lead found"})
    if(req.user.role !== "admin" &&  lead.userId.toString() !== req.user.id) return res.status(403).json({message: "not authorized to access"})
    res.status(200).json({message: "lead found", lead})
  } catch (error) {
    res.status(500).json({message: "could not fetch lead", error})
  }
}


// update lead status (admin only)
const updateLeadStatus = async(req,res)=>{
 try {
    const id = req.params.id
    const {status} =  req.body
    const validstatus = ['new', 'contacted', 'won', 'lost'] 
    if(!validstatus.includes(status)) return res.status(400).json({message: "invalid status value"})
    const lead = await leadSchema.findById(id)
    if(!lead) return res.status(404).json({message: "no lead found"})    
    if(req.user.role !== "admin") return res.status(403).json({message: "not authorized to perform the action"})  
    lead.leadstatus = status
    await lead.save()       
    res.status(200).json({message: "lead status updated",lead})  
 } catch (error) {
   res.status(500).json({message: "could not update lead status", error})
 }
}

//delete lead (admin only)
const deleteLead = async(req,res)=>{
    try {
        const id = req.params.id
        const lead = await leadSchema.findById(id)
        if(!lead) return res.status(404).json({message: "no lead found"})  
        if(req.user.role !== "admin") return res.status(403).json({message: "not authorized to perform the action"})
        await lead.deleteOne()   
        res.status(200).json({message: "lead deleted successfully"})       
    } catch (error) {
      res.status(500).json({message: "could not delete the lead", error})  
    }
}
module.exports = {createLead, getLeads, getLeadsbyId, updateLeadStatus, deleteLead}