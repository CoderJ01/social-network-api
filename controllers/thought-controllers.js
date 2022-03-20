const { User, Thought } = require('../models');

// req.body = usually used in PUT/POST
// req.param = ... GET

const thoughtController = {

    // get all thoughts
    getAllThought( {params}, res) {
        Thought.find(params)
        .then(({ _id }) => {
            return User.find(
                { _id: params.userId },
                { $all: { thoughts: _id } },
                { new: false }
            );
        })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // get one thought by id
    getThoughtById({ body }, res) {
        Thought.findOne({ _id: body.id})
        .then(retrievedThought => {
            if (!retrievedThought) {
                return res.status(404).json({ message: 'No thought found with this id' });
            }
            return User.findOne(
                { _id: body.userId },
                { $elemMatch: { thought: body.thoughtId }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // add thought to user
    createThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(!dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },

    // add reaction to thought
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: {reactions: body} },
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },

    // // update thought by id

    // delete thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(removedThought => {
            if (!removedThought) {
                return res.status(404).json({ message: 'No thought found with this id.' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: {thought: params.thoughtId }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },

    // remove reaction
    deleteReaction( {params}, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
        });
    },
}

module.exports = thoughtController;