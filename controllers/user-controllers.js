const { User } = require('../models');

const userController = {

    // get all users
    getAllUser(req, res) {
        User.find({})
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId})
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
            console.log('ERROR');
        });
    },

    // create a new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err)
        });
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body)
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

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },

    // add friend to user
    addFriend({ params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.friendId },
            { $push: {friends: body} },
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

    // remove friend by id
    deleteFriend( {params}, res) {
        User.findOneAndUpdate(
            { _id: params.friendId },
            { $pull: {friends: { friendId: params.friendId } }},
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

module.exports = userController;