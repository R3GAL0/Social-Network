const { User, Thought } = require('../models/index');
const connection = require('../config/connection');
connection.once('open', async () => {
  // seed reaction
  // seed thought

  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  const reactionData1 = [
    {
      reactionBody: 'wow what a reaction',
      username: 'jane',
    },
    {
      reactionBody: 'wow what a reaction',
      username: 'jack',
    },
    {
      reactionBody: 'wow what a reaction',
      username: 'jane',
    },
    {
      reactionBody: 'wow what a reaction',
      username: 'smith',
    },
  ];

  const reactionData2 = [
    {
      reactionBody: 'wow what a reaction',
      username: 'alex',
    },
    {
      reactionBody: 'wow what a reaction',
      username: 'jack',
    },
    {
      reactionBody: 'wow what a reaction',
      username: 'alex',
    },
    {
      reactionBody: 'wow what a reaction',
      username: 'smith',
    },
  ];

  // Thought.find({})
  //   .exec()
  //   .then(collection => {
  //     if (collection.length === 0) {\
  let data = [
    {
      thoughtText: "this is alex's profound thought",
      username: 'alex',
      // reactions: reactionData1,
    },
    {
      thoughtText: "this is jane's profound thought",
      username: 'jane',
      // reactions: reactionData2,
    },
  ];
  await Thought.insertMany(data)
  //       .catch(err => handleError(err));
  //   }
  // });
  console.log(data)
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

module.exports = Thought;