const { mockFirebase } = require('firestore-jest-mock');

mockFirebase({
    database: {
        users: [
            { id: '123', name: 'Homer Simpson' },
            { id: '456', name: 'Lisa Simpson' },
        ],
        posts: [{ id: '123', trade: 'Chausette' }],
    },
});
