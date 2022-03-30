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

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

// /api/thoughts/:userId/:thoughtId/:reactionId
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(deleteReaction);

module.exports = router;