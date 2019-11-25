const express = require("express");
const router = express.Router();

const {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	addUser
} = require("../controllers/usersController");

router
	.route("/")
	.get(getUsers)
	.post(addUser), [
		
	];

router
	.route("/:id")
	.get(getUser)
	.delete(deleteUser)
	.put(updateUser);

module.exports = router