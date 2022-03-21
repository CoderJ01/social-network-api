const seedUsers = () => {

    const userData = [
        {
            username: 'jellybeanboy',
            email: 'jason@yahoo.com',
            thoughts: [1, 4],
            friends: [2]
        },
        {
            username: 'HolisterFanatic',
            email: 'selena@sbcglobal.net',
            thoughts: [3],
            friends: []
        },
        {
            username: 'Steve098',
            email: 'steve@gmail.com',
            thoughts: [0, 2],
            friends: [0]
        }
    ];    

    return userData;
}

module.exports = seedUsers;