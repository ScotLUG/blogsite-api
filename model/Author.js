module.exports = function(seq, DT){
	return seq.define("Author",{
		given_name: {
			type: DT.STRING
		},
		family_name: {
			type: DT.STRING
		},
		gravatar: {
			type: DT.BOOLEAN
		},
		image_url:{
			type: DT.STRING
		}

	})
}