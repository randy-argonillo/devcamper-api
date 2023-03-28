const mongoose = require('mongoose');

const connect = async () => {
  const cn = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB Connected: ${cn.connection.host}`.cyan.underline);
};

module.exports = {
  connect
};