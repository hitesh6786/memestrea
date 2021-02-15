const mongoose = require('mongoose');
const config = require('config');

const db = config.get('DB');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});

		console.log('Database Connected');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;
