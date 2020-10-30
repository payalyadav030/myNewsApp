const submitPassword = {}
const { ObjectId } = require('mongodb')
const route = require('./../routes/submitPass.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongo= require('../DB/connect.js')

submitPassword.passwordSubmitted = function(token, UserId, resetNewPass, callback){

    db = mongo.db
    
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