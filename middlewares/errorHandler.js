const ErrorResponse = require('../errors/ErrorResponse');

function errorHandler(err, req, res, next) {
  console.log(err.stack.red);

  const errResponse = new ErrorResponse(err);

  res
    .status(errResponse.statusCode)
    .json({ success: false, errors: errResponse.errors });
}

module.exports = errorHandler;
