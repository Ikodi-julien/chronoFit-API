const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

module.exports = {
  testUser: (url) => {
    describe("user endpoints", () => {
      let userLength = 0;
      let newUserId, newUserFirstName, newUserLastName, newUserPseudo, newUserEmail, newUserPassword, newUserRoleId;
      
      // TODO faire la différence, GET /users ne devrait renvoyer que pour le rôle "authenticated" les pseudos-> trainingsDone -> training -> exercices -> results et pour le rôle "admin" devrait tout renvoyer. Il faut également implémenter les JWT comme authentification des requêtes.
      describe("GET /users", () => {
        it("should return all users", (done) => {
          chai.request(url)
          .get("/users")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.greaterThan(1);
            userLength = res.body.length
            done()
          })
        })
      })
      
      describe("GET /user/:id", () => {
        it("should return a random user", (done) => {
          // TODO test for created trainings, trainings done and their exercices and results
          chai.request(url)
          .get(`/user/${Math.ceil(Math.random() * userLength)}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('firstname');
            res.body.should.have.property('lastname');
            res.body.should.have.property('password');
            res.body.should.have.property('email');
            done()
          })
        })
      })
      
            
      describe("GET /user/:id doesn't exists", () => {
        it("should return an error, status 400", (done) => {
          chai.request(url)
          .get(`/user/${userLength + 10}`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
                  
      describe("GET /user/:id where id is a letter", () => {
        it("should return an error, status 400", (done) => {
          chai.request(url)
          .get(`/user/test`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
            
      describe("POST /user", () => {
        it("should create a user", (done) => {
          chai.request(url)
          .post(`/user`)
          .set('Accept', 'application/json')
          .send({
              'pseudo': 'user test',
              'email': 'user@test.fr',
              'firstname': 'user',
              'lastname': 'test',
              'password': 'usertest',
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('firstname');
            res.body.should.have.property('lastname');
            res.body.should.have.property('password');
            res.body.should.have.property('email');
            res.body.should.have.property('pseudo');
            newUserId = res.body.id;
            newUserFirstName = res.body.firstname;            
            newUserLastName = res.body.lastname;            
            newUserPseudo = res.body.pseudo;
            newUserPassword = res.body.password;
            done()
          })
        })
      })
      
      describe("POST /user empty field", () => {
        it("should return status 400", (done) => {
          chai.request(url)
          .post(`/user`)
          .set('Accept', 'application/json')
          .send({
            'pseudo': '',
            'email': 'user@test.fr',
            'password': 'usertest',
            })
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })

      describe("PATCH /user/:id", () => {
        it("should update the last created user, return user with same id and not same name and description", (done) => {
          chai.request(url)
          .patch(`/user/${newUserId}`)
          .set('Accept', 'application/json')
          .send({
            'pseudo': 'user test-updated',
            'email': 'user-updated@test.fr',
            'firstname': 'user-updated',
            'lastname': 'test-updated',
            'password': 'usertest-updated',
            })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('pseudo');
            res.body.should.have.property('firstname');
            res.body.should.have.property('lastname');
            res.body.should.have.property('email');
            
            chai.assert.equal(res.body.id, newUserId)
            chai.assert.notEqual(res.body.pseudo, newUserPseudo)
            chai.assert.notEqual(res.body.firstname, newUserFirstName)
            chai.assert.notEqual(res.body.lastname, newUserLastName);
            chai.assert.equal(res.body.lastname, 'test-updated');
            chai.assert.notEqual(res.body.email, newUserEmail)
            
            done()
          })
        })
      })
      
      describe('DELETE /user/:id', () => {
        it('should delete the newuser', (done) => {
          chai.request(url)
          .delete(`/user/${newUserId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            done()
          })
        })
      })
      
      describe("GET user just deleted", () => {
        it("should return an error, status 400 ", (done) => {
          chai.request(url)
          .get(`/user/${newUserId}`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
    })
  }
}