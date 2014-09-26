module.exports = function(seq, DT){
	return seq.define("Tag",{
		text: {
			type: DT.STRING
		},
		description:{
			type: DT.STRING
		},
		colour: {
			type: DT.STRING
		}
	})
}