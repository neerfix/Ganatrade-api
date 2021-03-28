const { mockFirebase } = require('firestore-jest-mock');

const app = require('./server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
//
//
// it('gets the users endpoint',  done => {
//     const response =  request.get('/users')
//     expect(response.status).toBe(200)
//     expect(response.body.message).toBe("")
//     done()
// })
//
// it('gets the offers endpoint',  done => {
//     const response =  request.get('/offers')
//     expect(response.status).toBe(200)
//     expect(response.body.message).toBe("")
//     done()
// })
//
// it('gets the categories endpoint',  done => {
//     const response =  request.get('/categories')
//     expect(response.status).toBe(200)
//     expect(response.body.message).toBe("")
//     done()
// })
//
// it('gets the trades endpoint',  done => {
//     const response =  request.get('/trades')
//     expect(response.status).toBe(200)
//     expect(response.body.message).toBe("")
//     done()
// })


const { mockCollection } = require('./mockfirebase');

test('Get User', () => {
    const firebase = require('firebase');
    const db = firebase.firestore();
    const mockCollection = jest.fn();

    return db
        .collection('users')
        .get()
        .then(users => {
            expect(users[0].name).toBe('Homer Simpson');
        });
});
