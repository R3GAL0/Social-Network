const router = require('express').Router();
const { Thought } = require('../../models');

// The `/api/thoughts` endpoint



// /api/thoughts
// get all thoughts
// get a thought by its id
// post to make a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// put to update a thought by id
// delete to remove a thought by id


// /api/thoughts/:thoughtid/reactions
// post create a reation stored in a thought reaction array
// delete to delete a single reaction

module.exports = router;
