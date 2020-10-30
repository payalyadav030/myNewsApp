const favorites = {}

const Model = require('./../models/Favorites.js')

favorites.favoritePage = function(req, res){
    if(!req.session.user){
        return res.status(400).send("User must be logged In")
    }
    var email = req.session.user[0].email;
    console.log("emaillll", email)
    Model.favoritePage(email, function(error, data){
        if(error){
            return res.send(error)
        }
        console.log("daata", data)
        console.log(data.favorites)
         res.render('favorite',{
            layout :'favor',
            favorites:data.favorites
        })
        // return res.send(data)
    })
}

module.exports = favorites