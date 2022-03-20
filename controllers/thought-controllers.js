const { User, Thought } = require('../models');

const thoughtController = {

    // // get all thoughts
    // getAllThought(req, res) {
    //     Thought.find({})
    //     .then(dbThoughtData => {
    //         res.json(dbThoughtData);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.sendStatus(400);
    //     });
    // },

    // // get one thought by id
    // getThoughtById({ params }, res) {
    //     Thought.findOne({ _id: params.id})
    //     .then(dbThoughtData => {
    //         res.json(dbThoughtData);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.sendStatus(400);
    //     });
    // },

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
    // updateThought({ params, body }, res) {
    //     Thought.findOneAndUpdate({ _id: params.id }, body)
    //     .then(dbThoughtData => {
    //         if (!dbThoughtData) {
    //             res.status(404).json({ message: 'No thought found with this id' });
    //             return;
    //         }
    //         res.json(dbThoughtData);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.json(err);
    //     });
    // },

    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(removedThought => {
            if (!removedThought) {
                return res.status(404).json({ message: 'No thought with this id.' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: {thought: params.thoughtId }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id' });
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