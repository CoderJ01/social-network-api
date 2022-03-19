const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// set up schema for Thought
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // 1 - 120 characters
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: {

        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// retrieve the number of reations a thought has 
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce(
        (total, reaction) => {
            total + reaction.count.length + 1,
            0
        }
    );
});

const Thought = model('Thought', ThoughtSchema);

model.exports = Thought;