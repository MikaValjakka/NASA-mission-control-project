const request = require('supertest');
const app = require('../../app');

describe('Test GET /lauches', () => {
    test('Should response with 200 success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
        
    })
})

describe('Test POST /launches', () => {

    const completeLaunchData= {
        mission:'Test',
        rocket:'TEST rocket 1',
        target: 'A habitable Planet',
        launchDate: 'January 4, 2300'
    };

    const launchDataWithoutDate = {
        mission:'Test',
        rocket:'TEST rocket 1',
        target: 'A habitable Planet'
        
    };

    const launchDataWithinvalidDate= {
        mission:'Test',
        rocket:'TEST rocket 1',
        target: 'A habitable Planet',
        launchDate: 'foobar'
    };

    test('It should response with 201 created', async () => {
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type',/json/)
        .expect(201);

        const requestDate = new Date (completeLaunchData.launchDate).valueOf();
        const responseDate = new Date (response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate)
    });

    test('It should catch missing required properties and response 400', async ()=>{
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type',/json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property',
        });

    });

    test('It should catch invalid dates', async ()=>{
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithinvalidDate)
            .expect('Content-Type',/json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date'
        });

    });
})