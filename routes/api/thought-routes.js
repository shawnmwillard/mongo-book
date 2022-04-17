const router = require("express").Router();
const {
  getAllThoughts,
  getOneThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// Route - /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Route - /api/thoughts/:thoughtId
router
  .router("/:thoughtId")
  .get(getOneThoughtById)
  .get(updateThought)
  .delete(deleteThought);

// Route - /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").put(addReaction);

// Route - api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
