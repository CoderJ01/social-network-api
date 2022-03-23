const seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/3001', function () {

    // Load Mongoose models
    seeder.loadModels([
        'model/User.js',   // Model_1 = User
        'model/Thought.js' // Model_2 = Thought
    ]);

    // Clear specified collections
    seeder.clearModels(['User', 'Thought'], function() {
        // Callback to populate DB once collections have cleared
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});

const data = [
    {
        'model': 'User',
        'documents': [
            {
                'username': 'jellybeanboy',
                'email': 'jellybean@email.com',
                'thoughts': [''],
                'friends': []            
            },
            {
                'username': 'steve095',
                'email': 'stevewilliams@gmail.com',
                'thoughts': [''],
                'friends': []            
            },
            {
                'username': 'HollisterFanatic',
                'email': 'fashiongal@sbcglobal.net',
                'thoughts': [''],
                'friends': []            
            }
        ]
    },
    {
        'model': 'Thought',
        'documents': [
            {
                'thoughtText': 'It is so so cold and foggy and rainy today lol. Perfect for Netflix and chill',
                'createdAt': Date(),
                'username': 'HollisterFanatic',
                'reactions': ''
            },
            {
                'thoughtText': 'Wow! That bakery looks so nice',
                'createdAt': Date(),
                'username': 'jellybeanboy',
                'reactions': ''
            },
            {
                'thoughtText': 'How is this app better than Instagram?',
                'createdAt': Date(),
                'username': 'steve095',
                'reactions': ''
            },
            {
                'thoughtText': 'This whole Russia/Ukraine issue has gotten crazy',
                'createdAt': Date(),
                'username': 'jellybeanboy',
                'reactions': ''
            },
            {
                'thoughtText': 'Omg i love this dress',
                'createdAt': Date(),
                'username': 'HollisterFanatic',
                'reactions': ''
            },
        ]
    }
];