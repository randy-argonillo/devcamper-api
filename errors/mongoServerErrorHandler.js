module.exports = function mongoServerErrorHandler(error){
  if (error.name !== 'MongoServerError') {
    throw new Error('Expects a MongoServerError for error parameter');
  }

  const {keyValue} = error;

  const errors = Object.keys(keyValue)
    .map(field => ({
      field,
      message: `'${keyValue[field]}' of '${field}' is already taken`
    }))

  return {
    statusCode: 400,
    errors: errors || []
  }
};