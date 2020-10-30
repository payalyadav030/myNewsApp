

const NewsAPI = require('newsapi');

var randomApi = ['39401baec9434faba658d2a99d4b8250','0f80b9b0a3a74e83ae6b56ff0411d0ea']
var api = randomApi[Math.floor(Math.random()* randomApi.length)]
console.log(api, "api")



//const newsapi = new NewsAPI('a230910ac0404106ab46f044d3519d21');
const newsapi = new NewsAPI(api)
const newsData = {}

newsData.getNews = function(req, res){
    newsapi.v2.topHeadlines({
        country:'in',
        page:req.body.page,
        catagory:req.body.catagory,
        pagesize:10
    }).then(response=>{
        // /console.log(response);
        return res.send(response)
    })

}
newsData.query = function(req, res){
    console.log("pk")
    console.log(req.body)
    newsapi.v2.everything({
        q:req.body.catagory,
        page:req.body.page|| 1,
        pagesize:10,
        langauge:'en'
    }).then(response=>{
        console.log(response);
        return res.send(response)
    })
}


// payalyadav.318@gmail.com - a230910ac0404106ab46f044d3519d21,
// tokenapi1@gmail.com -  39401baec9434faba658d2a99d4b8250 ,
// quicknews220@gmail.com - 0f80b9b0a3a74e83ae6b56ff0411d0ea


module.exports = newsData