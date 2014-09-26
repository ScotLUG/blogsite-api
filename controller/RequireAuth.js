
var model = require("../model/ModelLoader");

/** 
 * Authenticate and add cors endpoint
 */
var requireAuth = function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    if (req.param('key') != null){
        model.AuthorKey.find({where: {key: req.param('key')}, include: [model.Author]}).success(function(author){
            req.author = author;

            if (author != null){
                console.log(author.author.given_name);
                next();
            } else {
                res.send({"Error": {"code": 301, "message": "You need to be authorized to perform this action"}})
            }
        }).error(function(error){
            req.user = null;

            res.send({"Error": {"code": 301, "message": "You need to be authorized to perform this action"}})
        });
    } else {
        res.send({"Error": {"code": 301, "message": "You need to be authorized to perform this action"}})
        //next();
    }
};

module.exports = requireAuth