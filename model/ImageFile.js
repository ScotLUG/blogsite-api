module.exports = function(seq, DT){
	return seq.define("ImageFile",{
		title: {
			type: DT.STRING
		},
		description: {
			type: DT.STRING
		},
		url_path:{
			type: DT.STRING
		}
	})
}