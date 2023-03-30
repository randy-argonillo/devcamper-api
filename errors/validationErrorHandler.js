const _ = require('lodash/fp');

const fp = _.convert({ cap: false});

module.exports = (error) => {
  if (error.name !== 'ValidationError') {
    return {};
  }

  const { errors } = error;
  const normalizedErrors = fp.reduce((errorsList, errObj, field) => {
    return [
      ...errorsList,
      {
        field,
        message: errObj.message
      }
    ]
  }, [])(errors);
  
  
  
  return {
    errors: normalizedErrors,
    statusCode: 400
  }
};