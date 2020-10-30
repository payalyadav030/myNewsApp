
 //const { ObjectID } = require('mongodb');
const profile = require('./../routes/profile.js')

const Profile = {};

const mongo= require('../DB/connect.js')


Profile.updateProfile = function(username,email, callback){
    if(!username){
        return callback("Name required")
    }

    db = mongo.db
    
     
    var collection = db.collection('registration');
    collection.updateOne(
        {
        "email":email,
    },{
        $set: {
            "username": username
        }
    }
    ).then(function( response){
        if(response){
            return callback(null,response)

        }
    }).catch(function(error){
        return callback(error);
    })

        
    
}




module.exports = Profile;