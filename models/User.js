const { Schema, model } = require('mongoose');

// set up schema for User
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true, // set up friendCount to not be stored in MongolDB
        }
    }
);

// retrieve the number of friends a user has
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
        (total, friend) => {
            total + friend.count.length + 1,
            0
        }
    );
});

// set up email validation
UserSchema.path('email').validate(function (email) {
    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return emailRegex.text(email.text);
}, 'The e-mail field cannot be empty');

const User = model('User', UserSchema);

module.exports = User;