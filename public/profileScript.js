
var BASE_URL = "https://quicknews-app.herokuapp.com"
$(document).ready(function(){

    $('.icon').on('click', function(){
        $('.profileContainer').remove();

        var searchValue =  $('.search-input').val();
        searchBar(searchValue);
    })
    function searchBar(data){
        console.log(data)
        $.ajax({
            url: "https://newsapi.org/v2/everything?q="+data+"&apiKey=a230910ac0404106ab46f044d3519d21",
            method:"GET",

            success: function(response){
                //console.log(response);
                searchResults(response)
                pagination(response)

                
            }
        });  //ajax ends
    } //function ends
    $('body').append($('<div/>').addClass('pageRoot'))

    $('.pageRoot').append($('<main/>').addClass('pageMainTag'));
    //$('.pageRoot').append($('<div/>').addClass("pagination").append($('<ul/>').addClass("paginationUl")));

    function searchResults(data){
        console.log(data)
        for(var i=0; i< data.articles.length; i++){

            $('main').append($('<a/>').addClass('anchor').attr("href", data.articles[i].url).append($('<article/>').append([$('<h2/>').addClass("title").css({"color":"black"}).text(data.articles[i].title), 
            $('<p/>').css({"font-weight":"500"}).text(data.articles[i].author),
                 $('<img/>').attr("src", data.articles[i].urlToImage),
                $('<p/>').addClass("description").text(data.articles[i].description),
                 $('<p/>').addClass("content").text(data.articles[i].content),$('<b/>').text(data.articles[i].publishedAt)])));
             }      
          }


    if (window.navigator.geolocation) {
        window.navigator.geolocation
        .getCurrentPosition(showPosition, defaultPosition);         //(showPosition,defaultPosition)
       }
    
      function showPosition(position){
         var lat = position.coords.latitude;
         var long = position.coords.longitude;
          //console.log(lat,long);
    
          getWeather(lat, long)
      }
      
      function defaultPosition(error){            // 28.7041° N, 77.1025° E
       // console.log(error)
        getWeather(28.7041,77.1025 );
    
      }
    
      function getWeather(lat, long){
         // console.log(lat, long);
        $.ajax({
            url: `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`,
            method:"GET",
    
            success: function(data){
               // console.log(data);
                currentWeather(data);
            }
        })
     }
    
     function currentWeather(data){
        
         //$('.weather').append($('<img/>').addClass("weatherIcon").attr("src", "httpss://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F50d.png?1499366021771"),
         $('.weather').append(('<i class="fas fa-cloud-sun fa-2x"></i>'),
        $('<span/>').addClass("weatherDescription").text(data.weather[0].main),
        $('<span/>').addClass("weatherTemp").text(data.main.temp+ "°"));
     }

      $('.logout').on('click', function(){
        ///console.log("okkk")
        $.ajax({
            url:BASE_URL+"/logout",
            method:"POST",
            success: function(response){
                console.log(response);
                window.location.replace('/')
              
            }
        })
    })

    $('.saveChanges').on('click', function(){
        var username = $('.ModalprofileUsername').val();
        var email = $('.ModalprofileEmail').val();
        if(!username){
            $('.ModalprofileUsername').css({'border-bottom': 'solid 2px red', "border-top":"none","border-left":"none", "border-right":"none"})
            $('.ModalprofileUsername').css("font-weight","500").attr({"placeholder":" name required"});
            return false;
        }
            console.log(username, email);
            $.ajax({
                url:BASE_URL+"/updateUser",
                method:"POST",
                data:{
                    username:username,
                    email:email
                },
                success: function(response){
                    console.log(response)
                    //$('.modal').modal('hide');
                    $('.profileUsername').text(username);

                }
            })
    })

    $('.saveChangePassword').on('click', function(){
        var oldPassword = $('.oldPassword').val();
        var newPassword = $('.newPassword').val();
        var confirmPassword = $('.confirmPassword').val();
        if(!oldPassword){
            return false;
        }
        if(!newPassword){
            return false;
        }
        if(!confirmPassword){
            return false;
        }
        if(newPassword != confirmPassword){
            return false;
        }
        $.ajax({
            url:BASE_URL+"/changePassword",
            method:"POST",
            data:{
                oldPassword:oldPassword,
                newPassword:newPassword,
                confirmPassword:confirmPassword
            },
            success:function(response){
                console.log(response);
            }
        })

    })
    
    $('.imageUpload').on('change', function(e){

        $('.choosePicture p').hide();
        $('.choosePicture').append($('<button/>').addClass("btn btn-primary upload").css({"margin-left":"4px"}).text("Upload"));
      
      
        
        var tmppath = URL.createObjectURL(e.target.files[0]);
     
        var image=  $('.profileImg').append($('.profileImgSrc').css({"width":"100%", "height":"217px", "border-radius":"50%", "opacity":"0.1"}).attr('src', tmppath))
          //console.log(image)
          var formdata = new FormData();
             formdata.append('image', e.target.files[0] )

          $('.upload').on('click', function(){
              $.ajax({
                  url:BASE_URL+"/uploadPicture",
                  method:"POST",
                  processData: false,
                  contentType: false,
                  data:formdata,
                  success:function(response){
                      console.log(response)
                      var image=  $('.profileImg').append($('.profileImgSrc').css({"width":"100%", "height":"217px", "border-radius":"50%", "opacity":"1"}).attr('src', tmppath));
                      $('.upload').remove();
                      $('.choosePicture p').show();
                  }

              })
          })
            
    })

    

});

