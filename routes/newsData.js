
const { response } = require('express');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a230910ac0404106ab46f044d3519d21');
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



module.exports = newsData