const Bootcamp = require('../models/Bootcamp');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

exports.getBootcamps = async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
};

exports.createBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
};

exports.getBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return res
      .status(404)
      .json({ status: false, message: 'No bootcamp found' });
  }

  res.status(200).json({ success: true, data: bootcamp });
};

exports.updateBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return res
      .status(404)
      .json({ success: false, message: 'Bootcamp to update is not found' });
  }

  res.status(200).json({ success: true, data: bootcamp });
};

exports.deleteBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, message: 'Bootcamp to delete is not found.' });
    }

    res.status(200).json({ success: true });
};


module.exports = {
  ...asyncErrorHandler.wrapObject(exports)
};