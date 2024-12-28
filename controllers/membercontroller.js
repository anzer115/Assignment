const Member = require('../models/Member');

exports.addMember = async (req, res) => {
  const member = new Member({ ...req.body, teamId: req.params.id });
  await member.save();
  res.redirect('/');
};

exports.uploadImage = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).send({ error: 'Member not found' });

  member.imagePath = req.file.path;
  member.status = 'Image Uploaded';
  await member.save();
  res.redirect('/');
};

exports.getAllMembers = async (req, res) => {
  const members = await Member.find();
  res.send(members);
};
