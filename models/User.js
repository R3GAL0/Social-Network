const mongoose = require('mongoose');

// Schemas define the shape of the documents within the collection.
const userSchema = new mongoose.Schema({
  // Schemas define the properties of the document
  username: { type: String, required: true, unique: true, trim: true},
  email: {type: String, required: true, unique: true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  thoughts: {type: mongoose.Schema.Types.ObjectId, ref: "Thought"},
  friends: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

// Extend methods object with custom method
// Create model using mongoose.model()
const User = mongoose.model('User', userSchema);

// const handleError = (err) => console.error(err);

// // seeding data
// User.find({})
//   .exec()
//   .then(collection => {
//     if (collection.length === 0) {
//       User
//         .insertMany(
//           [
//             {
//               username: 'alex',
//               email: 'alex@abc.com',
//               thoughts: [], //tbd
//               friends: [], //tbd
//             },
//             {
//               username: 'jack',
//               email: 'jack@abc.com',
//               thoughts: [], //tbd
//               friends: [], //tbd
//             },
//             {
//               username: 'jane',
//               email: 'jane@abc.com',
//               thoughts: [], //tbd
//               friends: [], //tbd
//             },
//             {
//               username: 'smith',
//               email: 'smith@abc.com',
//               thoughts: [], //tbd
//               friends: [], //tbd
//             },
//           ]
//         )
//         .catch(err => handleError(err));
//     }
//   });



module.exports = User;
