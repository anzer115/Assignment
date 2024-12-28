const Team = require('../models/Team');
const Member = require('../models/Member') ;

exports.addTeam = async (req, res) => {
  const team = new Team({ ...req.body, organizationId: req.params.id });
  await team.save();
  res.redirect('/');
};
exports.deleteTeam = async (req, res) => {
    try {
      const teamId = req.params.teamId;
      // First, delete all members of the team
      await Member.deleteMany({ teamId });
  
      // Now, delete the team itself
      await Team.findByIdAndDelete(teamId);
  
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  