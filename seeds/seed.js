const { User, Thought } = require('../models/index');
const connection = require('../config/connection');
connection.once('open', async () => {

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let userData = [
    {
      username: 'alex',
      email: 'alex@abc.com',
      thoughts: ['652433119c7040d1048248a4'], //tbd
      friends: ['65243275022a96ba6eb8429d', '65243275022a96ba6eb8429e'], //tbd
    },
    {
      username: 'jack',
      email: 'jack@abc.com',
      thoughts: [], //tbd
      friends: ['65243275022a96ba6eb8429c'], //tbd
    },
    {
      username: 'jane',
      email: 'jane@abc.com',
      thoughts: ['652433119c7040d1048248a9'], //tbd
      friends: ['65243275022a96ba6eb8429c'], //tbd
    },
    {
      username: 'smith',
      email: 'smith@abc.com',
      thoughts: [], //tbd
      friends: [], //tbd
    },
  ];

  await User.insertMany(userData)

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

  let thoughtData = [
    {
      thoughtText: "this is alex's profound thought",
      username: 'alex',
      reactions: reactionData1,
    },
    {
      thoughtText: "this is jane's profound thought",
      username: 'jane',
      reactions: reactionData2,
    },
  ];
  await Thought.insertMany(thoughtData)
        .catch(err => handleError(err));
    
    
  console.log(thoughtData)
  console.log(userData)
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

module.exports = Thought;