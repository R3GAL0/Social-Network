const router = require('express').Router();
const { Thought, User } = require('../../models');

// The `/api/thoughts` endpoint



// /api/thoughts
// get all thoughts
// get a thought by its id
// post to make a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// put to update a thought by id
// delete to remove a thought by id


// get all thoughts
router.get('/all', (req, res) => {
    Thought.find()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json(err)
        });
});

// get a thought by id
router.get('/:id', async (req, res) => {
    try {
        const user = await Thought.findOne({ _id: req.params.id })
            .select('-__v');

        if (!user) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

// post a new thought
// requires: thoughtText, and username - optional: createdAt, reactions
// add new thought to user model thought array
router.post('/new', (req, res) => {
    // create a new thought
    Thought.create(req.body)
        .then(async (data) => {

            // update user
            await User.findOneAndUpdate(
                { 'username': req.body.username },
                { $push: { thoughts: data._id } },
                // so the updated user is returned
                { new: true }
            )
                // .then((data) => {
                //     console.log(data);
                // })
                .catch((err) => {
                    res.status(500).json(err);
                });
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
});

// put to update thought by id
router.put('/:id', (req, res) => {
    // update a user by its `id` value
    Thought.findOneAndUpdate({ '_id': req.params.id }, req.body,
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

// delete to remove thought by id
router.delete('/:id', (req, res) => {
    // delete a user by its `id` value
    Thought.findOneAndRemove({ _id: req.params.id })
        .then(() => {
            res.status(200).json("Thought removed")
        })
        .catch((err) => {
            res.status(500).json(err);
        })
});


// '/api/thoughts/reaction' routes

// post add a reaction to a thought
// req.body requires reactionBody, and username - created at is optional date object
router.post('/reaction/:thoughtid', async (req, res) => {

    await Thought.findOneAndUpdate(
        { '_id': req.params.thoughtid },
        { $push: { reactions: req.body } },
        // so the updated thought is returned
        { new: true }
    )
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
});

// delete remove a reaction from a thought
router.delete('/reaction/:thoughtid', async (req, res) => {

    await User.findOneAndUpdate(
        { '_id': req.params.userid },
        { $pull: { friends: req.body.id } },
        // so the updated thought is returned
        { new: true }
    )
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
});


module.exports = router;
