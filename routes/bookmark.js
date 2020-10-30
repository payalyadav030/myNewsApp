const bookmark ={}


const Model = require("./../models/Bookmark.js")

bookmark.bookMark = function(req, res){
    // console.log("favorites")
    // console.log(req.session.user)
    if(!req.session.user){
        return res.status(400).send("User must be Logged In")
    }
    var email = req.session.user[0].email
    // console.log(email)
    var link = req.body.link;
    var heading = req.body.heading;
    var author = req.body.author;
    var image = req.body.image;
    var description = req.body.description;
    var content = req.body.content;

    Model.bookMark(email,link, heading, author, image, description, content, function(error, data){
        if(error){
            return res.status(400).send(error)
        }
        return res.send(data)

    })    

}

module.exports = bookmark