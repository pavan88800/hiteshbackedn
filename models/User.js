const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 32,
		},

		lastname: {
			type: String,
			trim: true,
			maxlength: 32,
		},

		email: {
			type: String,
			required: true,
			unique: true,
		},

		userinfo: {
			type: String,
			trim: true,
		},

		password: {
			type: String,
			required: true,
		},

		role: {
			type: Number,
			default: 0,
		},

		purchases: {
			type: Array,
			default: [],
		},

		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('user', UserSchema);
