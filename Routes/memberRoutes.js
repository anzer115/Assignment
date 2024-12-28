const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { addMember, uploadImage, getAllMembers } = require('../controllers/membercontroller');

const upload = multer({
  dest: path.join(__dirname, '../uploads/'),
});

router.post('/teams/:id/members', addMember);
router.post('/members/:id/upload', upload.single('image'), uploadImage);
router.get('/members', getAllMembers);



module.exports = { memberRouter: router };
