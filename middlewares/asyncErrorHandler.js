const wrap = fn => (req, res, next) => {
  if (!isFunc(fn)) {
    throw new Error('Pass value for fn is not a function');
  }
  
  if (!isAsyncFunc(fn)) {
    return fn(req, res, next);
  }

  fn(req, res, next).catch(next);
};

const wrapObject = obj => {
  const newObj = {};
  const keys = Object.keys(obj);

  keys.forEach(key => {
    const val = obj[key];
    if (isAsyncFunc(val)) {
      newObj[key] = wrap(val);
    } else {
      newObj[key] = val;
    }
  });

  return newObj;
};

function isFunc(fn) {
  return fn instanceof Function;
}

function isAsyncFunc(fn) {
  return isFunc(fn) && fn.constructor.name === 'AsyncFunction';
}

module.exports = {
  wrap,
  wrapObject
};
