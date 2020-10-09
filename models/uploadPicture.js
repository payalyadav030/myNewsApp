const Upload = {}

const Route = require('./../routes/uploadpicture.js');
const MongoClient = require('mongodb').MongoClient;
var db = null;

var url = 'mongodb://localhost:27017';
MongoClient.connect(url, function(error, client){
    if(error){
        throw error;
    }
     db = client.db('newsApp');
     
});


Upload.getPicture = function(email, imageUrl, callback){
    var collection = db.collection('registration');

    collection.find({
        email:email
    }).toArray(function(error, result){
        if(error){
            return callback(error)
        }
        console.log(result);
            collection.updateOne(
                {
                    "email":email
            },
            {
                $set:{
                    "imageUrl":imageUrl
                }
            }
            ).then(function(response){
                console.log(response)
                return callback(null, response)
            }).catch(function(error){
                return callback(error);
            })

        //return callback(null, result)
    })


}


module.exports = Upload;