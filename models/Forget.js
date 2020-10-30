const Forget = {}

const forgetRoute = require('./../routes/forget.js')
const { uuid } = require('uuidv4');
const nodemailer = require('nodemailer');

async function main(verificationEmail, link) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        // service:'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'quicknews220@gmail.com',
            pass: 'Abc123@!'
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'quicknews220@gmail.com ', // sender address
      to: verificationEmail, // list of receivers
      subject: "Forgetten Password", // Subject line
      text: "Quick News Reset Password", // plain text body
      html: link, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  

  const mongo= require('../DB/connect.js')


Forget.verification = function(verificationEmail,  callback){
    //var link;
    console.log(verificationEmail);
    if(!verificationEmail){
        return callback("Email required");
    }
    db = mongo.db


    var collection = db.collection('registration');
    collection.find({
        email:verificationEmail
    }).toArray(function(error, response){
        if(error){
           // return callback(error);
           return callback("Email doesn't exist")
        }
        if(response.length == 0){
            return callback("Email doesn't exist")
        }
        console.log("mail veri response", response);
        if(response){
            var userId = response[0]._id;
            console.log(userId)
            var uId = uuid();
        console.log(uId);
        collection.updateOne(
            {
                "email":verificationEmail
            },{
                $set:{
                    "token":uId,
                    
                }
            }
        ).then(function(response){
            if(response){
                var link = " https://quicknews-app.herokuapp.com/resetPassword/"+uId+"/"+userId
                main(verificationEmail, link )
               
                 

                return callback(null, response)
            }
        }).catch(function(error){
            return callback(error);
        })


        }
        

    })
}



module.exports = Forget