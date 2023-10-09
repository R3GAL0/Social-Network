const router = require('express').Router();
const { User } = require('../../models');

// The `/api/users` endpoint

// get all users
router.get('/all', (req, res) => {
  User.find()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json(err)
    });
});

// get a user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .select('-__v');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
})

// post a new user
router.post('/new', (req, res) => {
  // create a new user
  User.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

// put to update user by id
router.put('/:id', (req, res) => {
  // update a user by its `id` value
  User.findOneAndUpdate({ '_id': req.params.id }, req.body,
    // so the updated user is returned
    { new: true }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

// delete to remove user by id
router.delete('/:id', (req, res) => {
  // delete a user by its `id` value
  User.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.status(200).json("User removed")
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});


// '/api/users/:userid/friends/:friendid' routes

// post add a friend to friend list
router.post('/friend/:userid', async (req, res) => {

  await User.findOneAndUpdate(
    { '_id': req.params.userid },
    { $push: { friends: req.body.id } },
    // so the updated user is returned
    { new: true }
  )
    .then(async (data) => {
      await User.findOneAndUpdate(
        { '_id': req.body.id },
        { $push: { friends: req.params.userid } },
        // so the updated user is returned
        { new: true }
      )
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

// delete remove a friend from friend list
router.delete('/friend/:userid', async (req, res) => {

  await User.findOneAndUpdate(
    { '_id': req.params.userid },
    { $pull: { friends: req.body.id } },
    // so the updated user is returned
    { new: true }
  )
    .then(async (data) => {

      await User.findOneAndUpdate(
        { '_id': req.body.id },
        { $pull: { friends: req.params.userid } },
        // so the updated user is returned
        { new: true }
      )
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

module.exports = router;
