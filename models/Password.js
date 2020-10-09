const changePassword = {}

const Password = require('./../routes/password.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const MongoClient = require('mongodb').MongoClient
var db = null;

var url = "mongodb://localhost:27017"
MongoClient.connect(url, function(error, client){
    if(error){
        throw error;
    }
    db = client.db('newsApp')
})


changePassword.updatePassword = function(oldPassword, newPassword, email, callback){
    if(!oldPassword){
        return callback("old Password required")
    }
    if(!newPassword){
        return callback("New password required")
    }
    
    var collection = db.collection('registration');

    collection.find({
        email:email

    }).toArray(function(error, response){
        if(error){
            return callback(error)
        }
        console.log("response password", response);

        bcrypt.compare(oldPassword, response[0].password, function(err, result){
            if(result == true){
                //return callback(null, response);
                bcrypt.hash(newPassword, saltRounds, function(err, hash){
                    console.log("hash password", hash);
                        collection.updateOne(
                            {
                                "email":email
                                },
                                {
                                    $set:{
                                       "password":hash 
                                    }
                                }
                        ).then(function(response){
                            return callback(null,response)
                        }).catch(function(error){
                            return callback(error);
                        })
                })
            }
        })
    })
    


}


module.exports = changePassword;