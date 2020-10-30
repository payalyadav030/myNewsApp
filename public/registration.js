
var BASE_URL = "https://quicknews-app.herokuapp.com"

$(document).ready(function(){

    function registration(username, email, password){
        if(!username){
            $('.username').css({'border-bottom': 'solid 2px red'})
            $('.username').css("font-weight","500").attr({"placeholder":" name required"})

        }
        if(!email){
            $('.email').css({'border-bottom': 'solid 2px red'})
            $('.email').css("font-weight","500").attr({"placeholder":" email required"})
        }
        if(password.length==0){
            //console.log(password)
            $('.password').css({'border-bottom': 'solid 2px red'})
            $('.password').css({"font-weight":"500"}).attr({"placeholder":" password required"})
        }

    }

    $('.loginBtn').on('click', function(){
        //console.log("okkk clicked");

        var username = $('.username').val();
        var email = $('.email').val();
        var password = $('.password').val();
        console.log(username);
        console.log(email);
        console.log(password);
        registration(username, email, password);

        $.ajax({
            url: "https://apilayer.net/api/check?access_key=d877e856165c4155b3066cfa263a5adf&email="+email,
            method: "GET",
            
            success:function(response){
               console.log(response);
               if(response.smtp_check == true){
                   validateEmail()
               }
              
            }
        })
        function validateEmail(){
            $.ajax({
                url: BASE_URL+"/register",
                method: "POST",
                data:{
                    username:username,
                    email:email,
                    password:password
    
                },
                success:function(response){
                   console.log(response);
                   //window.location.replace('/');
                   if(response == "User exist"){
                    var userExist = $('.input-3').css({"color":"red", "font-weight":"700" }).text(" Oops!! User already exist");
                    console.log(userExist)
    
                        return userExist;
                   }
                   else{
                      // $('.loginBtn').css({"color":"white"}).text("Sign Up")
                      window.location.replace('/');
                   }
                }
            })

        }
        
     });

     function validation(email, password){
       // console.log(password)
        if(!email){
            $('.email').css({'border-bottom': 'solid 2px red'})
            $('.email').attr({"placeholder":" password required"})
        }
        if(password.length==0){
            //console.log(password)
            $('.password').css({'border-bottom': 'solid 2px red'})
            $('.password').attr({"placeholder":" password required"})
        }

     }

     $('.loginButton').on('click', function(){
        //console.log("ok clickedddd")

        var email = $('.email').val();
        var password = $('.password').val();

        validation(email, password);
        // console.log(email, password);

        $.ajax({
            url: BASE_URL+"/login",
            method: "POST",
            data:{
                email:email,
                password:password
            },

            success: function(response){
                console.log(response);
                window.location.replace('/');
               //console.log(response[0].username)
               
                
            },
            error:function(err){
                if(err){
                    $('.input-3').css({"font-weight":"700", "color":"red"}).text(err.responseText)
                }
                console.log(err);
            }
        })
    });

    $('.logout').on('click', function(){
        console.log("okkk")
        $.ajax({
            url:BASE_URL+"/logout",
            method:"POST",
            success: function(response){
                console.log(response);
                window.location.replace('/')
              
            }
        })
    })

    $('.sendVerification').on('click', function(){
        var verificationEmail = $('.Email').val();
        console.log(verificationEmail);

        $.ajax({
            url:BASE_URL+"/verification",
            method:"POST",
            data:{
                verificationEmail:verificationEmail
            },
            success:function(response){
                console.log(response);
                $('.sub-0').css({"font-weight":"700", "color":"green", "text-align":"center"}).text("Message has been sent to your mail")
            },
            error:function(err){
                if(err){
                    console.log(err);
                    $('.sub-0').css({"font-weight":"700", "color":"red", "text-align":"center"}).text(err.responseText)
                    //$('.sub-1').css({"font-weight":"700", "color":"red"}).text(err.responseText) 
                }
            }
        })
    })

    ////// after mail, allocating new password
    $('.submitPass').on('click', function(){
        var location = document.location.href;
        //console.log(location)
        var token = location.split("/")[4]
        var UserId = location.split("/")[5]
        console.log(token, UserId)
        var resetNewPass = $('.resetNewPass').val();
        console.log(resetNewPass)
        var resetConfirmPass = $('.resetConfirmPass').val();
        console.log(resetConfirmPass)
        if(!resetNewPass){
            $('.resetNewPass').css({'border-bottom': 'solid 2px red'})
            $('.resetNewPass').css("font-weight","500").attr({"placeholder":" password required"})

        }
        if(!resetConfirmPass){
            $('.resetConfirmPass').css({'border-bottom': 'solid 2px red'})
            $('.resetConfirmPass').css("font-weight","500").attr({"placeholder":" password required"})

        }
        if(resetNewPass != resetConfirmPass){
            $('.passNotMatched').css({"font-weight":"650", "color":"red", "text-align":"center"}).text("Password didn't matched")
        }
        $.ajax({
            url:BASE_URL+"/submitPassword",
            method:"POST",
            data:{
                token:token,
                UserId:UserId,
                resetNewPass:resetNewPass,
                resetConfirmPass:resetConfirmPass
            },
            success:function(response){
                console.log(response)
                $('.passNotMatched').css({"font-weight":"700", "color":"green", "text-align":"center"}).text(response)
            },
            error:function(err){
                console.log(err)
                $('.passNotMatched').css({"font-weight":"650", "color":"red", "text-align":"center"}).text("Invalid token")

            }
        })
       
    })



});