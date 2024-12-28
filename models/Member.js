const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }, // Link to Team
    uniqueId: { type: String, required: true },
    imagePath: { type: String, default: null },
    status: { type: String, default: 'Image Not Uploaded' }, // Status field
});

module.exports = mongoose.model('Member', memberSchema);
