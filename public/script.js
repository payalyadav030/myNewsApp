
var BASE_URL= "https://quicknews-app.herokuapp.com"

$(document).ready(function(){
    var categoryVal="latest";
    
    //var count=0;
  

    function headlines(count, data){  
        console.log(count)
        
        // count = count +1;
      // console.log(count);
     
      $.ajax({
            url:BASE_URL+"/news/search",
            // url:"https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?country=in&page="+count+"&category="+data+"&pagesize=10&apiKey=a230910ac0404106ab46f044d3519d21",
            method: "POST",
            data:{
                catagory:data,
                page:count
            },
   
            success : function(response){
                console.log("response", response);
                pagination(response);

                callOne(response);
                
               // readOne()     
          }     
       }); // ajax ends
      
    }
    
    headlines(1,"latest")
    
    // functional programming
    function callOne(data){
            
        readOne(data);   
     }
     $('body').append($('<div/>').addClass('root'));
     $('.root').append($('aside'));
     //$('.root').append($('<a/>').addClass('anchor'))
     $('.root').append($('<div/>').addClass('sub-root').append($('<main/>').addClass("main")));
     $('.root').append($('<div/>').addClass("sideDiv"));
     $('.sub-root').append($('<div/>').addClass("pagination").append($('<ul/>').addClass("paginationUl")))
    
    
     function readOne(card){
        //  shareContent(card)
        
         //console.log(card.articles);
         for(var i=0; i< card.articles.length; i++){
             var html= '<div class="share-button">'+
             '<a href="#" class="social-toggle"><i class="fas fa-share fa-2x shareIcon"></i></a>'+
           '<div class="social-networks">'+
             '<ul>'+
              ' <li class="social-twitter">'+
                 '<a href="httpss://www.twitter.com">T</a>'+
               '</li>'+
              '<li class="social-facebook">'+
               '<a href="#">F</a>'+
               '</li>'+
               '<li class="social-gplus">'+
                 '<a href="#" class="goToWtsp"><i class="fab fa-whatsapp fa-1x"></i></a>'+
               '</li>'+
             '</ul>'+
           '</div>'+
              '</div> ';  
             // <i class="fab fa-whatsapp fa-1x"></i>                                                                                           

        $('main').append($('<a/>').addClass('anchor').attr("href", card.articles[i].url).append($('<article/>').append([$('<h2/>').addClass("title").css({"color":"black"}).text(card.articles[i].title), 
        $('<p/>').addClass("author").css({"font-weight":"500"}).text(card.articles[i].author),
             $('<img/>').attr("src", card.articles[i].urlToImage),
            $('<p/>').addClass("description").text(card.articles[i].description),
             $('<p/>').addClass("content").text(card.articles[i].content),
            $('<div/>').addClass('addingShareFav').append([ $('<p/>').text(card.articles[i].publishedAt),
            $('<div/>').addClass('share').append(html),
            
            //  $('<span/>').addClass('share').append('<i class="fas fa-share fa-2x"></i>'),
            $('<span/>').addClass('addToSave').append('<i class="fas fa-bookmark fa-2x"></i>')])

            ])));
         }      
     }

     ///////CATAGORY LIST ON DEVICE- MOBILE/////////////////////////////////////
     $('.fa-bars').on('click', function(){
         console.log("okk")
         $('.catagory').css({"display":"initial","background-color":"aliceblue"})
         $('.sub-root').css({"display":"none"})
        //  $('.list').css({"flex":"0.5"})
         
     })
     $('.crossIcon').on('click', function(){
         console.log("ok")
         $('.sub-root').css("display","initial");
         $('.catagory').css("display","none")
     })




     ////////////////FAVORITES-BOOKMARK/////////////////
     $(document).on('click','.addToSave', function(){
        console.log("clicked bookmark");
        // $(this).css({"color": " green", "padding-left":"2px"})
        var link = $(this).closest(".anchor")
        console.log(link[0].href)   
        var heading = $(this).closest(":has(h2)").find('h2');
        console.log(heading[0].innerText);
        var author = $(this).closest(":has(.author)").find('.author')
        console.log(author[0].innerText);
        var image = $(this).closest(":has(img)").find('img');
        console.log(image[0].src)
        var description = $(this).closest(":has(.description)").find('.description')
        console.log(description[0].innerText);
        var content = $(this).closest(":has(.content)").find('.content');
        console.log(content[0].innerText)
        $.ajax({
             url:BASE_URL+"/bookmark",
             method:"POST",
             data:{
                link :link[0].href,
                heading:heading[0].innerText,
                author:author[0].innerText,
                image:image[0].src,
                description:description[0].innerText,
                content:content[0].innerText
             },
             success: function(response){
                 console.log(response);
                 if(response){
                     $('.addToSave').css({"padding-left":"2px"})
                 }
                 
             },
             error:function(err){
                 if(err){
                    
                     alert(err.responseText)
                 }
             }
            
     })
    })

    ////////////////////////FAVORITES PAGE//////////////////////////////////////////

    
        $('.favorites').on('click', function(){
            console.log("okkkayyy")
            $.ajax({
                url:BASE_URL+"/favorites",
                method:"GET",
                success:function(response){
                    console.log("okk")
                    console.log(response)
                }
            })
        })
    

    
    





     ///////WHATSAPP SHARE/////////
        $(document).on('click','.social-gplus',function(){
            console.log("ok");
            var heading = $(this).closest(":has(h2)").find('h2');
           console.log(heading[0].innerText);

           var image = $(this).closest(":has(img)").find('img');
           console.log(image[0].src)

           var link = $(this).closest(":has(.anchor)").find('.anchor');
           console.log(link[0].href)

           var content = $(this).closest(":has(.content)").find('.content');
           console.log(content[0].innerText)

        //    console.log(window.Plugin)   
         var whatsappUrl = "whatsapp://send?text="+ heading[0].innerText  +"-"+ encodeURIComponent( link[0].href)+  content[0].innerText
            // var whatsappUrl = "whatsapp://send?text="+encodeURIComponent(image[0].src)
          window.location.replace(whatsappUrl)
    
        })//////END


        $(document).on('click','.social-facebook', function(){
            console.log("ok");
            var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes"
            var heading = $(this).closest(":has(h2)").find('h2');
          // console.log(heading[0].innerText);
           var link = $(this).closest(":has(.anchor)").find('.anchor');
           //console.log(link[0].href);
           var content = $(this).closest(":has(.content)").find('.content');
           //console.log(content[0].innerText)

        //    httpss://www.facebook.com/sharer/sharer.php?u=example.org

            // var facebookURL = <a href="httpss://www.facebook.com/sharer/sharer.php?u="></a>
            
            var facebookURL = "https://www.facebook.com/sharer/sharer.php?u="+[[link[0].href]]+"&"+[[content[0].innerText]];
            console.log(facebookURL)
              window.open(facebookURL,"_blank", strWindowFeatures);

        })

        $(document).on('click', '.social-twitter', function(){
            console.log("ok");
            var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
            var heading = $(this).closest(":has(h2)").find('h2');
            // console.log(heading[0].innerText);
             var link = $(this).closest(":has(.anchor)").find('.anchor');
             //console.log(link[0].href);
             var content = $(this).closest(":has(.content)").find('.content');
             //console.log(content[0].innerText)
             //httpss://twitter.com/intent/tweet?url=

             var twitterURL = "https://twitter.com/intent/tweet?url="+[[link[0].href]]+"&"+[[content[0].innerText]];
             console.log(twitterURL);
             window.open(twitterURL, "_blank", strWindowFeatures)


        })

     $(document).on('click','.social-toggle', function() {
        $(this).next().toggleClass('open-menu');
      });
      

     $(document).on('click', ".addingShareFav", function(e) { 
        e.stopPropagation();
        e.preventDefault();
        
    });


    // Location
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

     
     function pagination(result){
         //console.log(result.totalResults);
        
        // var x = $('.paginationUl')[0]
        //  console.log(x);

        //  if(x){
        //      return false;
        //  }

         var newsList = ((result.totalResults)/10);
    
         console.log(newsList);
         paginationNo(newsList)
     }

     function paginationNo(count){
         //console.log(count);
        // console.log(count%1 ===0);                //false = float, true=int
       var  typeofNum = count%1===0;
        console.log(typeofNum);

        if(typeofNum == false){
            if(count>8){
                count=8;
            }
            for(var i=1; i<=count+1; i++){
                console.log(i);
               
               // $('.paginationUl').append([$('<li/>').append($('<button/>').addClass("pageNo")).text(i)]);
               $('.paginationUl').append([$('<li/>').addClass("pageNo").append($('<button/>').addClass("pageBtn").text(i))]);
                   
             }
        }
        else{
            if(count>8){
                count = 8;
            }
            for(var i=1; i<= count; i++){
                $('.paginationUl').append([$('<li/>').addClass("pageNo").append($('<button/>').addClass("pageBtn").text(i))]);
               
            }
        
        }
     }
    
        $('body').on('click','.pageBtn', function(){
           
            btnValue=$(this).text();
            //console.log(btnValue)         
           $('.main').children().remove();
           $('.paginationUl').children().remove();

            headlines(btnValue,categoryVal);
 });

        $('.list li span').on('click', function(){
        //console.log("Ok")
       // $('.main')
             categoryVal= $(this).text();
            console.log(categoryVal);
            $('.main').children().remove();
            $('.paginationUl').children().remove();


            headlines(1,categoryVal)
        });


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //search bar

        $('.icon').on('click', function(){
          var searchValue =  $('.search-input').val();
          $('.main').children().remove();
            $('.paginationUl').children().remove();

          
          searchBar(searchValue);
        });
        function searchBar(data){
            console.log(data)
            categoryVal=data
            $.ajax({
                url:BASE_URL+"/news/search",
                //  url: "https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/everything?q="+data+"&apiKey=a230910ac0404106ab46f044d3519d21",
                method:"POST",
                data:{
                    catagory:data
                },

                success: function(response){
                    console.log(response);

                    pagination(response);
                    callOne(response);


                }
            });  //ajax ends
        } //function ends

 }); //document ends

 