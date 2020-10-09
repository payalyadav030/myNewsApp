// News App

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const multer = require('multer')
const saltRounds = 10;

const app = express();
const PORT = 8900;

app.use(express.json());
app.use(express.urlencoded());
app.use('/static', express.static('public'));

app.use(session({
    name: "newsApp",
    secret:"abcdefgh1234$$$###",
    
    cookie:{
        httpOnly:true,
        maxAge:1000 * 3600 * 24 * 30 * 2, //2 month
       }
}));

const hbs = exphbs.create({
    extname: '.hbs'
});

const fileStorage = multer.diskStorage({
    destination:function(req, file, cb){
        var url = req.url;

        var path = 'public/uploads';
        return cb(null,path);
    },
    filename:function(req, file, cb){
        var filename =(new Date().getTime()) + file.originalname;
        return cb(null, filename)
    }
})
const upload = multer({
    storage: fileStorage
})





var homepageRoute = require('./routes/home.js')
var loginPageRoute = require('./routes/login.js');
var registerRoute = require('./routes/register.js');
var profileRoute = require('./routes/profile.js');
var passwordRoute = require('./routes/password.js');
var forgetPassword = require('./routes/forget.js');
var resetPassword = require('./routes/resetPassword.js');
var submitPassword = require('./routes/submitPass.js');
var UploadPicture = require('./routes/uploadpicture.js')



app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');




app.get('/', homepageRoute.getHomePage);
app.get('/signIn', loginPageRoute.loginPage );
app.get('/registerPage', registerRoute.getRegister);
app.post('/register', registerRoute.getInfo);
app.post('/login', loginPageRoute.getEmail );
app.post('/logout', loginPageRoute.checkLogout );
app.get('/profilePage', profileRoute.getProfile );
app.post('/updateUser', profileRoute.updateProfile);
app.post('/changePassword', passwordRoute.updatePassword );
app.get('/forgetPassword', forgetPassword.forgetPassword);
app.post('/verification', forgetPassword.verification);
app.get('/resetPassword/:id/:userId', resetPassword.getPage);
app.post('/submitPassword', submitPassword.passwordSubmitted);
app.post('/uploadPicture',upload.single('image'), UploadPicture.getPicture)




app.listen(PORT, function(){
    console.log("Application has been started on the PORT:", PORT);
})