const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// Schemas define the shape of the documents within the collection.
const reactionSchema = new mongoose.Schema({
  reactionId: {type: mongoose.Schema.Types.ObjectId, default: new ObjectId},
  reactionBody: {type: String, required: true, maxlength: 280},
  username: {type: String, required: true},
  createdAt: {type: Date, default: Date.now, }
})

const thoughtSchema = new mongoose.Schema({
  // Schemas define the properties of the document
  thoughtText: { type: String, required: true, maxlength: 280, minlength: 1},
  createdAt: {type: Date, default: Date.now, },
  // user who made the thought
  username: {type: String, required: true}, 
  reactions: [reactionSchema],
},
{
  // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
  // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
  toJSON: {
    virtuals: true,
  },
  id: false,
});
// add virtual reaction count

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });


// Create model using mongoose.model()
const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;
