const Bootcamp = require('../models/Bootcamp');

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res
        .status(404)
        .json({ status: false, message: 'No bootcamp found' });
    }

    res.status(200).json({ success: true, data: bootcamp});
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.updateBootcamp = async (req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!bootcamp) {
      return res.status(404).json({success: false, message: 'Bootcamp to update is not found'});
    }

    res.status(200).json({success: true, data: bootcamp});
  } catch(e) {
    res.status(400).json({success: false, message: e.message});
  }
};

exports.deleteBootcamp = async (req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(404).json({success: false, message: 'Bootcamp to delete is not found.'});
    }

    res.status(200).json({success: true});
  } catch(e) {
    res.status(400).json({success: false, message: e.message});
  }
};
