const { User, Thought } = require("../models");

const userController = {
  // All users with friends
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // One user with friends
  getOneUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({ path: "friends" })
      .populate({ path: "thoughts" })
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "There is no user with this ID" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // New user - lowercase email on the client side
  createUser({ body }, res) {
    User.create(body)
      .then((newUserData) => res.json(newUserData))
      .catch((err) => res.status(400).json(err));
  },

  // Update user - lowercase email on client side
  updateUser({ body, params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUserData) => {
        if (!updatedUserData) {
          res.status(404).json({ message: "There is no user with this ID" });
          return;
        }
        res.json(updatedUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a user - not currently cascading
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((deletedUserData) => {
        if (!deletedUserData) {
          res.status(404).json({ message: "There is no user with this ID" });
          return;
        }

        Thought.deleteMany({ username: deletedUserData.username })
          .then(res.json({ message: "User and thoughts deleted successfully" }))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  // Add another user to friends array
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },

  //Remove another user from the friends array
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $spull: { friends: params.friendId } },
      { new: true }
    )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
