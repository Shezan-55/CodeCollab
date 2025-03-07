import User from "../model/user.js"

async function Profile(req,res) {
    
    res.send(`Welcome to Profile ${req.user.name}`)
}


export default Profile;