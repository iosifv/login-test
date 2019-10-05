const request = require('supertest');
const app = require('../app');

describe("homepage", () => {
    it("welcomes the user", (done) => {
        request(app).get("/")
            .expect(200)
            .expect(/login/)
            .expect(/register/)
            .expect(/Acme Inc/, done);
    })
})

describe("login", () => {
    it("displays the login page", (done) => {
        request(app).get("/users/login")
            .expect(200)
            .expect(/Email/)
            .expect(/Password/)
            .expect(/Login/, done);
    })
})

describe("register", () => {
    it("displays the register page", (done) => {
        request(app).get("/users/register")
            .expect(200)
            .expect(/register/)
            .expect(/name/)
            .expect(/email/)
            .expect(/password/)
            .expect(/confirm/)
            .expect(/register/, done);
    })
})
