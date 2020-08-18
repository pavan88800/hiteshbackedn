const mongoose = require('mongoose');

const CategroySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			maxlength: 32,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('categroy', CategroySchema);
