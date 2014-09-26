module.exports = function(seq, DT){
	return seq.define("AuthorKey",{
		key: {
			type: DT.STRING
		},
		secret: {
			type: DT.STRING
		},
		description: {
			type: DT.STRING
		}

	})
}