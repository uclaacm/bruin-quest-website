module.exports = {
	// mongoURI:process.env.MONGO_URI
	mongoURI: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/myapp`
};
