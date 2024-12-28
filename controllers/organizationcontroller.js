const Organization = require('../models/Organization');
const Team = require('../models/Team');
const Member = require('../models/Member');

exports.getOrganizations = async (req, res) => {
  const organizations = await Organization.find();
  const hierarchy = await Promise.all(
    organizations.map(async (org) => {
      const teams = await Team.find({ organizationId: org._id });
      const teamsWithMembers = await Promise.all(
        teams.map(async (team) => {
          const members = await Member.find({ teamId: team._id });
          return { ...team.toObject(), members };
        })
      );
      return { ...org.toObject(), teams: teamsWithMembers };
    })
  );

  res.render('index', { hierarchy });
};

exports.addOrganization = async (req, res) => {
  const org = new Organization(req.body);
  await org.save();
  res.redirect('/');
};

exports.deleteOrganization = async (req, res) => {
    const orgId = req.params.id;
    // Delete all teams and members associated with the organization
    await Team.deleteMany({ organizationId: orgId });
    await Member.deleteMany({ teamId: { $in: await Team.find({ organizationId: orgId }).distinct('_id') } });
    // Delete the organization
    await Organization.findByIdAndDelete(orgId);
    res.redirect('/');
  };


// Function to fetch and render organization hierarchy
exports.getHierarchy = async (req, res) => {
    try {
        const hierarchy = await Organization.find().populate('teams.members');
        res.render('hierarchy', { hierarchy });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
    }
};

  