const home = {}

home.getHomePage = (req,res)=>{
    // console.log(res);
    console.log("logginn",req.session.user)
    if(req.session.user){
        //return res.send("LOggedIN")
        
        return res.render('homepage', {
            data: true,
            username: req.session.user[0].username
          

        } )
        
      }

    return res.render('homepage');
}



module.exports = home; 