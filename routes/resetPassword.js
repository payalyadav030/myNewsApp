
const reset = {}
const Model= require('./../models/Resetpassword.js')

reset.getPage = function(req, res){
    var id = req.params.id;
    var userId = req.params.userId;
    console.log(id, userId);

    // Model.getPage(id, userId, function(error, data){
    //     if(error){
    //         return res.status(400).send(error)
    //     }
    //     return res.send(data);
    // })
    
   return res.render('resetPass', {layout:'reset'})
}
// reset.changePass = function(req, res){
    
    
// }

module.exports = reset