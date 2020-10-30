

const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config()
var DB;
// mongodb+srv://quicknews:<password>@cluster0.fybb2.mongodb.net/<dbname>?retryWrites=true&w=majority
var url = 'mongodb+srv://quicknews:'+process.env.DB_PASS+'@cluster0.fybb2.mongodb.net/'+process.env.DB_USER+'?retryWrites=true&w=majority';
const connection = {}

connection.connectDB = (cb)=> MongoClient.connect(url, function(error, client){
    if(error){
        
        return cb(error)
    }
    DB = client.db('newsApp');
    connection.db=DB
    
    cb(null,"success")
     
});
connection.db = DB


module.exports =  connection