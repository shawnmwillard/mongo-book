const res = require("express/lib/response");
const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts, including reactions
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },

  // Get a single thought and its reactions
  getOneThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "There is no thought with this ID" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Add a new thought to a user
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "There is no user with this ID" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },

  // Update a thought using its ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "There is no thought with this ID" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a thought using its ID - Could also clear it from the user using session data
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "There is no thought with this ID" });
          return;
        }
        res.json({ message: "The thought has been deleted successfully" });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a thought to add reaction to the thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $spush: { reactions: body } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "There is no thought with this ID" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a thought to delete a reaction from the thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $spull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "There is no thought with this ID" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },
};
