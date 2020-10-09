const password = {}


const Model = require('./../models/Password.js');


password.updatePassword = function(req, res){
    if(!req.session.user){
        return res.status(400).send("User required")
    }
    var oldPassword = req.body.oldPassword
    var newPassword = req.body.newPassword;
    var email = req.session.user[0].email;
    

    console.log(oldPassword,newPassword)

    Model.updatePassword(oldPassword, newPassword,email,  function(error, data){
        if(error){
            return res.status(400).send(error)
        }
        return res.send(data)
    })

}
module.exports = password;