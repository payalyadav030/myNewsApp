const Picture ={}
const cloudinary = require('cloudinary').v2

cloudinary.config({
   cloud_name:"ddljr6uv1",
   api_key:"833925197552781",
   api_secret:"1kD2Q0kUo0oCHniqNSNr-sC5Qys"
})


 const multer = require('multer')

const Model = require('./../models/uploadPicture.js')



Picture.getPicture = function(req,res){
   console.log(req.session.user)
   var email = req.session.user[0].email
   console.log(email);
   console.log(req.file);
   //console.log(req.body)

   // return res.json({
   //    data: req.file
   // });
   cloudinary.uploader.upload(req.file.path, function(error, response){
      if(error){
         return res.send(error)
      }
      console.log(response.url);
      var imageUrl = response.url;

      Model.getPicture(email, imageUrl, function(error, data){
         if(error){
            return res.status(400).send(error)
         }
         req.session.user[0].imageUrl = imageUrl;
         return res.send(data);

      })



   })
  

    


 }
 


module.exports = Picture