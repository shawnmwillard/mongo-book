const router = require("express").Router();
const {
  getAllUsers,
  getOneUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controllers");

// Route - /api/users
router.route("/").get(getAllUsers).post(createUser);

// Route - api/users/:userId
router.route("/:userId/friends/:friendId").put(addFriend).delete(removeFriend);

module.exports = router;
