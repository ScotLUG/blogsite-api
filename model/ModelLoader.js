/**
 * Configure the database and build the model
 */
var Sequelize = require('Sequelize');

var sequelize = new Sequelize('database', 'username','password',{
    dialect: "sqlite"
})

var modules = ["Author","AuthorKey","BlogPost","BlogComment","ImageFile","Tag"]
var model = [];
for (var i = modules.length - 1; i >= 0; i--) {
	var moduleName = modules[i];
	model[moduleName] = sequelize.import(moduleName);
};

var Author = sequelize.import("Author")
var AuthorKey = sequelize.import("AuthorKey");
var BlogPost = sequelize.import("BlogPost")
var BlogComment = sequelize.import("BlogComment")
var ImageFile = sequelize.import("ImageFile")
var Tag = sequelize.import("Tag")

Author.hasMany(BlogPost);
BlogPost.belongsTo(Author)
Author.hasMany(AuthorKey);
AuthorKey.belongsTo(Author);
BlogPost.hasMany(BlogComment);

Tag.hasMany(BlogPost);
BlogPost.hasMany(Tag);

Tag.hasMany(ImageFile);
ImageFile.hasMany(Tag);


sequelize.sync({force: true});
Author.sync();
AuthorKey.sync();
BlogPost.sync();
BlogComment.sync();
ImageFile.sync();
Tag.sync();


for (var i = modules.length - 1; i >= 0; i--) {
	console.log(module)
	module.exports[modules[i]] = model[modules[i]];
};
