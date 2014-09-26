var express = require('express');
var Sequelize = require('Sequelize');
var router = express.Router();

var model = require("../model/ModelLoader");
var requireAuth = require("../controller/RequireAuth")






/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});



router.get('/post/all', function(req, res) {
  	model.BlogPost.findAll().success(function(resu){
  		res.send(resu);
  	})
});

router.get('/post/:url', function(req, res){
	var url = req.params.url;
	model.BlogPost.find({where:{"url": url}}).success(function(resu){
		res.send(resu);
	})
})

/**
 * Create a blog Post
 */
router.post('/post', requireAuth, function(req, res){
	console.log(res.author);
	model.BlogPost.create({
		name: req.body.name,
		url: req.body.url,
		content: req.body.content,
		published: false
	}).success(function(out){
		out.setAuthor(req.author).success(function(out){
			res.send(out);
		})
		.error(function(err){
			res.status(400);
			res.send(err)
		})
	}).error(function(err){
		res.status(400);
		res.send(err)
	})
});

/**
 * Update a blog Post
 */
router.post('/post/:id', requireAuth ,function(req, res){

	model.BlogPost.find({where:{url: req.params.id}}).success(function(post){
		post.name = (req.body.name != null) ? req.body.name : post.name
		post.url = (req.body.url != null) ? req.body.url : post.url
		post.content = (req.body.content != null) ? req.body.content : post.content
		post.published = (req.body.published) ? req.body.publishe : post.published
		post.save().success(function(out){
			res.send(out);
		}).error(function(err){
			res.send(err)
		})

	})
});

/**
 * Publishes a blog post3
 */
router.put('/post/publish', requireAuth,function(req, res){

});



module.exports = router;
