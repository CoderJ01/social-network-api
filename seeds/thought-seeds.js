const seedThoughts = () => {
    
    const reactionData = [
        {
            reactionId: 1,
            reactionBody: 'Ikr',
            username: 'jellybeanboy',
            createdAt: Date()
        },
        {
            reactionId: 2,
            reactionBody: 'Not to mention, gas prices are skyrocketing',
            username: 'Steve098',
            createdAt: Date()
        }
    ];
    
    const thoughtData = [
        {
            thoughtText: 'Wow! This new movie is great!',
            createdAt: Date(),
            username: 'Steve098',
            reactions: reactionData[0]
        },
        {
            thoughtText: 'I love the bakery on Elm Street in NYC.',
            createdAt: Date(),
            username: 'jellybeanboy',
            reactions: ''
        },
        {
            thoughtText: 'How is this app better than Instagram?',
            createdAt: Date(),
            username: 'Steve098',
            reactions: ''
        },
        {
            thoughtText: 'It is raining and cold. Netflix and chill for me.',
            createdAt: Date(),
            username: 'HolisterFanatic',
            reactions: ''
        },
        {
            thoughtText: 'Dang! This whole Ukraine and Russia conflict is getting crazy rn',
            createdAt: Date(),
            username: 'jellybeanbody',
            reactions: reactionData[1]
        }
    ];

    return thoughtData;
}

module.exports = seedThoughts;