const authorizerole =(...allowedrole)=>{
  return (req, res, next)=>{
    if(!allowedrole.includes(req.user.role)) return res.status(403).json({message: "Forbidden - Insufficient role"})
        next()
  }
}

module.exports = authorizerole