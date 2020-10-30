Favorites = {}

const Route = require('./../routes/favorites.js');
const mongo= require('../DB/connect.js');
Favorites.favoritePage = function(email, callback){
    if(!email){
        return callback("Email required")
    }
    db = mongo.db
    var collection = db.collection('registration')
    collection.findOne({
        email:email
    }, function(error, response){
        if(error){
            return callback(error)
        }
        else{
            return callback(null, response)
        }
    })
    
}

module.exports = Favorites