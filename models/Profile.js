
 //const { ObjectID } = require('mongodb');
const profile = require('./../routes/profile.js')

const Profile = {};

const MongoClient = require('mongodb').MongoClient
var db = null;

var url = "mongodb://localhost:27017"
MongoClient.connect(url, function(error, client){
    if(error){
        throw error;
    }
    db = client.db('newsApp')
})



Profile.updateProfile = function(username,email, callback){
    if(!username){
        return callback("Name required")
    }
    
     
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