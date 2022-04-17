const { Schema, model, Types } = require("mongoose");
const { DateTime } = require("luxon");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, required: true, max: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use the native JS Date and convert it to a DateTime to print out
      get: (createdAtVal) =>
        DateTime.fromJSDate(createdAtVal).toLocaleString(DateTime.DATETIME_MED),
    },
  },
  { toJSON: { getters: true } }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, min: 1, max: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        DateTime.fromJSDate(createdAtVal).toLocaleString(DateTime.DATETIME_MED),
    },
    username: { type: String, required: true },
    reactions: [ReactionSchema],
  },
  { toJSON: { virtual: true, getters: true }, id: false }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
