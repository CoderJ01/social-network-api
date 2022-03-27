const router = require('express').Router();
const { 
    getAllThought,
    getThoughtById,
    createThought,
    addReaction,
    updateThought,
    deleteThought,
    deleteReaction
 } = require('../../controllers/thought-controllers');

// /api/thoughts/:userId
router
    .route('/:userId')
    .get(getAllThought)
    .post(createThought);

// /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thougths/:thoughtId/reactions
router
    .route('/:userId/:thoughtId/:reactionId')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;