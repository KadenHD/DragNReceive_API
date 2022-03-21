import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../app.js';

chai.should();
chai.use(chaiHttp);

describe('Requests API', () => {
    describe("GET /api/currentUser", () => {
        it('Response is an object', () => {
            chai.request(server)
                .get("/api/currentUser")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                });
        });
        it('Response is null because no token in header', () => {
            chai.request(server)
                .get("/api/currentUser")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('currentUser').eql(null);
                });
        });
    });

    describe("POST /api/loginUser", () => {
        it('Client cannot loggedin', () => {
            let data = {
                email: 'client@client.client',
                password: 'Password1@'
            }
            chai.request(server)
                .post("/api/loginUser")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('error')
                });
        });
        it('Wrong password cannot loggedin', () => {
            let data = {
                email: 'client@client.client',
                password: 'Password2@'
            }
            chai.request(server)
                .post("/api/loginUser")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('error')
                });
        });
        it('Wrong email cannot loggedin', () => {
            let data = {
                email: 'test@test.test',
                password: 'Password1@'
            }
            chai.request(server)
                .post("/api/loginUser")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('error')
                });
        });
        it('Valid Sadmin, Admin or Partner can be logged in', () => {
            let data = {
                email: 'admin@admin.admin',
                password: 'Password1@'
            }
            chai.request(server)
                .post("/api/loginUser")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.header.should.have.property('token')
                    response.body.should.have.property('token')
                    response.body.should.have.property('user')
                });
        });
    });
});