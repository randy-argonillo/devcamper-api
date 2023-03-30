module.exports = (error) => {
  //todo: check if a valid error object
  if (!(error instanceof Error)) {
    throw new Error('Expects an Error object to pass for argument error');
  }

  return {
    statusCode: 500,
    errors: [{message: error.message}]
  }
}