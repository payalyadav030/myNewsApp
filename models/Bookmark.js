const Bookmark = {}
const mongo= require('../DB/connect.js')
const Route = require("./../routes/bookmark.js");
// const MongoClient = require('mongodb').MongoClient;
// var db = null;

// var url = 'mongodb://localhost:27017';
// MongoClient.connect(url, function(error, client){
//     if(error){
//         throw error;
//     }
//      db = client.db('newsApp');
     
// });

Bookmark.bookMark = function(email, link, heading, author, image, description, content,callback){
    if(!email){
        return callback("Email required")
    }
    db = mongo.db
    var collection = db.collection('registration');
    // var myArray=[]
    var myArray = {
        link:link,
        heading:heading,
        author:author,
        image:image,
        description:description,
        content:content
    }
    
    collection.findOne({
        email:email
    }, function(error, response){
        if(error){
            return callback(error)
        }
        else{
            collection.updateOne(
                {
                    "email":email
            },
            {
                $push : { favorites: myArray }
            }
            ).then(function(response){
                if(response){
                    return callback(null, response)
                }
            }).catch(function(error){
                return callback(error)
            })
        }
       
        
    })



}

module.exports = Bookmark