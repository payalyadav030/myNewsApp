const Registration ={}
//const { ObjectID, ObjectId } = require('mongodb');


const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongo= require('../DB/connect.js')

Registration.getInfo = function(username, email, password, callback){
    if(!username){
       
       return callback("username required")
    }
    if(!email){
        return callback("email required");
    }
    if(!password){
        return callback("password required");
    }

    db = mongo.db
    
    var collection = db.collection('registration');
    
    collection.findOne({
        email:email
    }, function(error, response){
        if(response){
           // console.log("found")
          return callback(null, "User exist");  
          
        }
        else{
            bcrypt.hash(password, saltRounds, function(err, hash){
                console.log("hash", hash);
                 collection.insertOne({
                                username:username,
                                email:email,
                                password:hash,
                                imageUrl :"https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png"
                        
                            } , function(error, success){
                                if(error){
                                    return callback(error);
                                }
                                //console.log("succes",success);
                                return callback(null,success);
                            })
            })
              
        }
    })
}

module.exports = Registration






