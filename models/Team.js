const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  organizationId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Team', teamSchema);
