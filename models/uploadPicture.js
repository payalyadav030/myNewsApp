const Upload = {}

const Route = require('./../routes/uploadpicture.js');
const mongo= require('../DB/connect.js')


Upload.getPicture = function(email, imageUrl, callback){
    db = mongo.db


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