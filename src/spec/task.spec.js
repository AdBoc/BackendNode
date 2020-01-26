const request = require('supertest');
const chai =require('chai');
const application = require('../index');

const app = application.app;
const mongoose = application.db;
const expect = chai.expect; //wyciagniecie z boeiktu zmienna pomocniczaespect

describe('tasks integrations tests', () => {
    mongoose.connection.collections.tasks.drop(() => {
    })
    describe('#GET /api/tasks', () => {//on jest synchroniczny http request sa asynchroniczne 
        it('should get empty task list', (done) => { //czeka az test sie wykona 
            request(app).get('/api/tasks').end((err, res) => {
                //blad polaczenia to err asercja sprawdzanie konkretnych rzeczy
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.be.empty;
                done();
            })
        })
    })

    
    
    describe('#POST /api/tasks', () => {
        it('should add task and return json', (done) => { 
            request(app).post('/api/tasks')
                .send({title: 'new task', description: 'some test'})
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.all.keys(['_id', 'title', '__v', 'createdAt', 'description', 'status', 'updatedAt']);
                    done();
                })
            })
        })
})

//back - chai moha supertest
//jfrontend - jest moha  

// --tag production
//chai js

//mock zastepuje pewna funkcjonalnosc aplikacji w testach 
//query parameters zwroc wszystkie taski z deadline w najblizszym tygodniu 