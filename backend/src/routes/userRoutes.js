const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");

router.post('/', userController.createUser);
router.get('/userslist', userController.getUsersList);
router.get('/editusers/:id', userController.getUserById);
router.put('/editusers/:id',userController.updateUser);

module.exports = router;