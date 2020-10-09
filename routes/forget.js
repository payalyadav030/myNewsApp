const forget ={}

const Model = require('./../models/Forget.js')
//const { uuid } = require('uuidv4');

forget.forgetPassword = function(req, res){
    res.render('forget', {layout: 'for'})
}

forget.verification = function(req, res){
    
    // var email = req.session.user[0].email;
    var verificationEmail = req.body.verificationEmail
    console.log(verificationEmail);

    Model.verification(verificationEmail, function(error, data){
        if(error){
            return res.status(400).send(error)
        }
        return res.send(data);
    })

    
}





module.exports = forget