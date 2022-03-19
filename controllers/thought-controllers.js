const { Thought } = require('../models');

const thoughtController = {

    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .then(dbThoughtData => {
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id})
        .then(dbThoughtData => {
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // create a new thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.json(err)
        });
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body)
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },

    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    }
}

module.exports = thoughtController;