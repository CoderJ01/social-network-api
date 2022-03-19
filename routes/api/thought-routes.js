const router = require('express').Router();
const { 
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
 } = require('../../controllers/thought-controllers');

// /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;