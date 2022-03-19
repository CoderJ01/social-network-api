const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// set up schema for Reaction
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// set up schema for Thought
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 120
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
        reactions: [ReactionSchema]
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