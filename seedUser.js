const userSchema = require("./models/user")
const bcrypt = require("bcrypt")
const seedUsers = async()=>{
    try {
         const adminExist = await userSchema.findOne({email: "admin@example.com"}) 
            if(!adminExist) {
            const hashedPsrd = await bcrypt.hash("admin@123", 10)
                await userSchema.create({
                name: "admin",
                email: "admin@example.com",
                password: hashedPsrd,
                role: "admin"
            })
            console.log("admin created successfully")
            }
            else{
                console.log("admin already exist")
            }

         const user1 = await userSchema.findOne({email: "user1@example.com"}) 
            if(!user1){
                const hasheduserPsrd = await bcrypt.hash("user1@123", 10)
                await userSchema.create({
                name: "user1",
                email: "user1@example.com",
                password: hasheduserPsrd,
                role: "user"
                })
            console.log("user1 created successfully")
            }
            else{
            console.log("user1 already exist")
                }
        } catch (error) {
        console.log(error)
        }
}

module.exports = seedUsers