const mongoose = require('mongoose');

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
  reactions: reactionSchema,
});
// add virtual reaction count

// Extend methods object with custom method
// Create model using mongoose.model()
const Thought = mongoose.model('Thought', thoughtSchema);

// Create new instance of model
const discountedBook = new Book({
  title: 'Oh the Places You Will Go!',
  price: 100,
});


module.exports = Thought;
