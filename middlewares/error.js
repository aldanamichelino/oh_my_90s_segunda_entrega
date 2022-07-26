const errorHandler = (error, req, res, next) => {
  console.log('Error', error.message);
	const status = error.status || 400;
	return res.status(status).send(error.message);
}

module.exports = {
	errorHandler
}