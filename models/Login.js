const Login = require("../routes/login.js")

const LoginProcess = {}
const bcrypt = require('bcrypt');
const saltRounds = 10;


const mongo= require('../DB/connect.js')


LoginProcess.getEmail = function(email, password, callback){
    if(!email){
        return callback("email required");
    }
    if(!password){
        return callback("password required");
    }
    
    db = mongo.db
    
    var collection = db.collection('registration');
    collection.find({
        email:email,
        
    }).toArray(function(error, response){
        if(error){
            //return res.send("user not found")
            return callback(error);
        }
        console.log("response mongodb",response);
        if(response.length == 0){
            return callback("Account Doesn't exist!!")
        }
        
        bcrypt.compare(password, response[0].password, function(err, result) {
            console.log(result);
            if(result == true){
                return callback(null,response);

            }else{
                return callback("Password Incorrect")
            }
        });
        
      
    
    })
}

module.exports = LoginProcess