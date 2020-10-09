const submitPass = {}

//const { resolveContent } = require('nodemailer/lib/shared');
const Model = require('./../models/SubmitPass.js')

submitPass.passwordSubmitted = function(req, res){
    var token = req.body.token;
    var UserId = req.body.UserId;
    var resetNewPass = req.body.resetNewPass;
    //var resetConfirmPass = req.body.resetConfirmPass;

    console.log(token, UserId, resetNewPass);

    Model.passwordSubmitted(token,UserId, resetNewPass, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.send(data);
    })

}

module.exports = submitPass