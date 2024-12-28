const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
});

module.exports = mongoose.model('Organization', organizationSchema);
