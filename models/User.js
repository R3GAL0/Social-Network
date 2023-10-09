const mongoose = require('mongoose');

// Schemas define the shape of the documents within the collection.
const userSchema = new mongoose.Schema(
  {
    // Schemas define the properties of the document
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String, required: true, unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought"
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });


// Create model using mongoose.model()
const User = mongoose.model('User', userSchema);
module.exports = User;
