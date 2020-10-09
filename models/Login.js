const Login = require("../routes/login.js")

const LoginProcess = {}
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

LoginProcess.getEmail = function(email, password, callback){
    if(!email){
        return callback("email required");
    }
    if(!password){
        return callback("password required");
    }

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