var url = "mongodb://localhost:27017";
const db = "";
MongoClient.connect(url, function(error, client){
    if(error){
        throw error;
    }
    db = client.db('newsApp');
})