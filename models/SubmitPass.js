const submitPassword = {}
const { ObjectId } = require('mongodb')
const route = require('./../routes/submitPass.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const MongoClient = require('mongodb').MongoClient
var db = null;

var url = "mongodb://localhost:27017"
MongoClient.connect(url, function(error, client){
    if(error){
        throw error;
    }
    db = client.db('newsApp');
})

submitPassword.passwordSubmitted = function(token, UserId, resetNewPass, callback){
    
    var collection = db.collection('registration')
    collection.find({
        _id:  new ObjectId(UserId)
    }).toArray(function(error, response){
        if(error){
            //console.log("ok")
            return callback(error)
        }
        console.log(response)
         if(response[0].token == token){
                console.log("yes token")
                bcrypt.hash(resetNewPass, saltRounds,function(err, hash){
                    console.log("hash", hash)
                    collection.updateOne(
                        {
                            "_id": new ObjectId(UserId)
                    },
                    {
                            $set:{
                                "password":hash
                            }
                    }
                    ).then(function(response){
                        //console.log(response)
                        collection.update(
                            {
                                "_id": new ObjectId(UserId)
                        },
                        {
                            $unset:{
                                "token":""
                            }
                        }
                        ).then(function(response){
                            return callback(null, "password reset successfully")
                        }).catch(function(error){
                            if(error){
                                return callback(error)
                            }
                        })
                       
                    }).catch(function(error){
                        if(error){
                            return callback(error)
                        }
                    })
                })
                
            
            }
            else{
                return callback("Invalid token")
            }
        
    });

}//


module.exports = submitPassword