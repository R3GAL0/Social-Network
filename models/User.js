const mongoose = require('mongoose');

// Schemas define the shape of the documents within the collection.
const userSchema = new mongoose.Schema({
  // Schemas define the properties of the document
  username: { type: String, required: true, unique: true, trim: true},
  email: {type: String, required: true, unique: true, 
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  thoughts: {type: mongoose.Schema.Types.ObjectId, ref: "Thought"},
  friends: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

// Extend methods object with custom method
// Create model using mongoose.model()
const user = mongoose.model('User', userSchema);

// Create new instance of model
const discountedBook = new Book({
  title: 'Oh the Places You Will Go!',
  price: 100,
});


module.exports = User;
