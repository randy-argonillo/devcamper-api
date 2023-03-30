const validationErrorHandler = require('./validationErrorHandler');
const defaultErrorHandler = require('./defaultErrorHandler');
const castErrorHandler = require('./castErrorHandler');

const errorHandlers = {
  ValidationError: validationErrorHandler,
  CastError: castErrorHandler,
  default: defaultErrorHandler
}

class ErrorResponse extends Error {
  constructor(originalError) {
    if ((!originalError instanceof Error)){
      throw new Error('originalError should be an Error object');
    }

    super(originalError.message); 

    this.statusCode = null;
    this.errors = [];

    this.processError(originalError);
  }

  processError(error) {
    const result = this.handleError(error)();
    
    this.statusCode = result.statusCode;
    this.errors = result.errors;
  }

  handleError(error){
    return () => {
      const handler = errorHandlers[error.name] || errorHandlers['default'];
      return handler(error);
    }
  }

}

module.exports = ErrorResponse;