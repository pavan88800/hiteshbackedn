const mongosee = require('mongoose');
const colors = require('colors');
require('dotenv').config();
const ConnectDB = async () => {
	try {
		await mongosee.connect(process.env.MONOGURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log(colors.inverse.yellow('MongoDB Connected...'));
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = ConnectDB;
