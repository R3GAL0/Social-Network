TBD:

readme

Seed data
    missing user thoughts referances
    
API Routes
    /api/users
        get all users
        get a user by id
        post a new user
        put to update user by id
        delete to remove user by id
    /api/users/:userid/friends/:friendid
        post add a friend to friend list
        delete remove a friend from friend list
    /api/thoughts
        get all thoughts
        get a thought by its id
        post to make a new thought 
            (don't forget to push the created thought's _id to the associated user's thoughts array field)
            tbd
        put to update a thought by id
        delete to remove a thought by id
    /api/thoughts/:thoughtid/reactions
        post create a reation stored in a thought reaction array
        delete to delete a single reaction