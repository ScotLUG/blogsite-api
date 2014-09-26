module.exports = function(seq, DT){
	return seq.define("BlogComment",{
		name: {
			type: DT.STRING
		},
		email:{
			type: DT.STRING
		},
		content:{
			type: DT.STRING(500)
		}
	})
}