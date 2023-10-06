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
});
// add virtual reaction count

// Extend methods object with custom method
// Create model using mongoose.model()
const Thought = mongoose.model('Thought', thoughtSchema);

// const handleError = (err) => console.error(err);


// seed reaction
// seed thought
// const reactionData1 = [
//   {
//     reactionBody: 'wow what a reaction',
//     username: 'jane',
//   },
//   {
//     reactionBody: 'wow what a reaction',
//     username: 'jack',
//   },
//   {
//     reactionBody: 'wow what a reaction',
//     username: 'jane',
//   },
//   {
//     reactionBody: 'wow what a reaction',
//     username: 'smith',
//   },
// ];

// const reactionData2 = [
//   {
//     reactionBody: 'wow what a reaction',
//     username: 'alex',
//   },
//   {
//     reactionBody: 'wow what a reaction',
//     username: 'jack',
//   },
//   {
//     reactionBody: 'wow what a reaction',
//     username: 'alex',
//   },
//   {
//     reactionBody: 'wow what a reaction',
//     username: 'smith',
//   },
// ];

// Thought.find({})
//   .exec()
//   .then(collection => {
//     if (collection.length === 0) {
//       Thought
//         .insertMany(
//           [
//             {
//               thoughtText: "this is alex's profound thought",
//               username: 'alex',
//               reactions: reactionData1,
//             },
//             {
//               thoughtText: "this is jane's profound thought",
//               username: 'jane',
//               reactions: reactionData2,
//             },
//           ]
//         )
//         .catch(err => handleError(err));
//     }
//   });

module.exports = Thought;
