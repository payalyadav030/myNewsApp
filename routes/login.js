const login ={}

const Model = require('./../models/Login.js')

login.loginPage = function(request , response){
      response.render('login',{layout:'auth'} );
}

login.getEmail = function(req, res){
      console.log("req rec")
      // console.log(req)
      var email = req.body.email;
      var password = req.body.password;

      console.log(email, password);

      Model.getEmail(email, password, function(error, data){
            if(error){
            return res.status(400).send(error);
            }
            //return res.redirect('/');
            //console.log(data)
            

            req.session.user = data;
            console.log("session",req.session.user);
            
            //res.redirect('/');
            return res.send(data);
       })
}
login.checkLogout = function(req, res){
      //console.log("ok")
      req.session.destroy();

      return res.status(200).send("logged out")
      
}


module.exports = login