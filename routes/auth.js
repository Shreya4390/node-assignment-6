const express = require('express');
const { authentication, verifyToken } = require('../middleware/authentication');
const authController = require('../controllers/auth.controller');
const { validation } = require('../helpers/constant')

const router = express.Router();

router.post('/auth/generateToken', authentication);
// Create user
router.post('/auth/createUser', verifyToken, validation, authController.createUser);
// Update user details
router.put('/auth/updateUser/:id', verifyToken, validation, authController.updateUserDetails);
// Delete a user with id
router.delete("/auth/deleteUser/:id", verifyToken, authController.deleteUser);
// Find a user with id
router.get("/auth/findUser/:id", verifyToken, authController.findUser);
// Find all user 
router.get("/auth/findAllUser", verifyToken, authController.findAllUser);
//Delete all users details
router.delete("/auth/deleteAllUser", verifyToken, authController.deleteAllUsers);

module.exports = router;
