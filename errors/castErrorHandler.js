module.exports = (error) => {
  if (error.name !== 'CastError') {
    throw new Error('Expects a CastError for error parameter');
  }

  const message = error.path === '_id' ? 'Resource not found': error.message;

  return {
    statusCode: 400,
    errors: [
      { message }
    ]
  }
};