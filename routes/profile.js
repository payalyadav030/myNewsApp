const profile = {}

const Model = require('./../models/Profile.js')


profile.getProfile = function(req, res){
    console.log("profile session",req.session.user)
    if(req.session.user){
      return  res.render('profile', {
            layout: 'prof',
            username : req.session.user[0].username,
            email: req.session.user[0].email,
            imageUrl: req.session.user[0].imageUrl

            }
            
        )

    }
    else{
       return res.render('login', {layout: 'auth'})
    }

}
profile.updateProfile = function(req, res){
    //console.log(req, res);
    if(!req.session.user){
        return res.status(400).send("Login Required")
    }
    var username = req.body.username;
    var email = req.session.user[0].email;
    

    console.log(username);

    Model.updateProfile(username,email,  function(error, data){
        if(error){
            console.log("error", error)
            return res.status(400).send(error)
        }
         req.session.user[0].username=username
        return res.send(data)
    })
}







module.exports = profile

