const {User, Thought } = require('../models/index');
const connection = require('../config/connection');

connection.once('open', async () => {
// seeding data

let thoughtCheck = await connection.db.listCollections({ name: 'users' }).toArray();
if (thoughtCheck.length) {
  await connection.dropCollection('users');
}


// User.find({})
//   .exec()
//   .then(collection => {
//     if (collection.length === 0) {
      User
        .insertMany(
          [
            {
              username: 'alex',
              email: 'alex@abc.com',
              thoughts: [], //tbd
              friends: [], //tbd
            },
            {
              username: 'jack',
              email: 'jack@abc.com',
              thoughts: [], //tbd
              friends: [], //tbd
            },
            {
              username: 'jane',
              email: 'jane@abc.com',
              thoughts: [], //tbd
              friends: [], //tbd
            },
            {
              username: 'smith',
              email: 'smith@abc.com',
              thoughts: [], //tbd
              friends: [], //tbd
            },
          ]
        )
        // .catch(err => handleError(err));
  //   }
  // });

  console.info('Seeding complete! 🌱');
  process.exit(0);
});


  module.exports = User;