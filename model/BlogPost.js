module.exports = function(seq, DT){
	return seq.define("BlogPost",{
		name: {
			type: DT.STRING,
			validate:{
				notEmpty: true
			}
		},
		url: {
			type: DT.STRING,
			validate:{
				notEmpty: true
			}
		},
		content:{
			type: DT.STRING(20000),
			validate:{
				notEmpty: true
			}
		},
		published:{
			type: DT.BOOLEAN
		}
	})
}