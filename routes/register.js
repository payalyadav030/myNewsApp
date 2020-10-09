const regsiter ={}

const Model = require('./../models/Register.js');

regsiter.getRegister = function(req, res){
    // console.log("user checking",req.session.user)
    res.render('register' , {layout: 'auth'});

}

regsiter.getInfo = function(req, res){
    console.log("okkk", req.body);
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    //console.log(username, email, password);
    //console.log(res,"res")

    Model.getInfo(username, email, password, function(error, data){
        if(error){
            return res.status(400).send (error)
        }
       
        //console.log(data.ops)
        req.session.user = data.ops;
        
        //console.log("user checking",req.session.user)
        //console.log( "register session", req.session.user)
        return res.send(data);
    })   
}



module.exports = regsiter