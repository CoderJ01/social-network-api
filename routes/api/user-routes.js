const router = require('express').Router();
const { 
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
 } = require('../../controllers/user-controllers');

// /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/friends
router
    .route('/friends')
    .post(addFriend);

// /api/users/:friendId
router
    .route('/:friendId')
    .delete(deleteFriend);

module.exports = router;