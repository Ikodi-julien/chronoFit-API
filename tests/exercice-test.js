const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

module.exports = {
  testExercice: (url) => {
    describe("Exercice", () => {
      let exerciceLength = 0;
      let newExerciceId, newExerciceName, newExerciceDescription;
      
      describe("GET /exercices", () => {
        it("should return all categories", (done) => {
          chai.request(url)
          .get("/exercices")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.greaterThan(1);
            exerciceLength = res.body.length
            done()
          })
        })
      })
      
      describe("GET /exercice/:id", () => {
        it("should return a random exercice", (done) => {
          chai.request(url)
          .get(`/exercice/${Math.ceil(Math.random() * exerciceLength)}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('description');
            res.body.should.have.property('isBenchmark');
            done()
          })
        })
      })
      
            
      describe("GET /exercice/:id doesn't exists", () => {
        it("should return an error, status 400", (done) => {
          chai.request(url)
          .get(`/exercice/${exerciceLength + 10}`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
                  
      describe("GET /exercice/:id where id is a letter", () => {
        it("should return an error, status 500", (done) => {
          chai.request(url)
          .get(`/exercice/test`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
            
      describe("POST /exercice", () => {
        it("should create an exercice", (done) => {
          chai.request(url)
          .post(`/exercice`)
          .set('Accept', 'application/json')
          .send({
              'name': 'exo test',
              'description': 'Un test de création d\'un exercice',
              'isBenchmark': false
            })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            newExerciceId = res.body.id;
            res.body.should.have.property('name');
            newExerciceName = res.body.name;
            res.body.should.have.property('description');
            newExerciceDescription = res.body.description;
            res.body.should.have.property('isBenchmark');
            done()
          })
        })
      })
      
      describe("POST /exercice empty field", () => {
        it("should return status 400", (done) => {
          chai.request(url)
          .post(`/exercice`)
          .set('Accept', 'application/json')
          .send({
              'name': '',
              'description': '',
              'isBenchmark': null
            })
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
                  
      describe("PATCH /exercice/:id", () => {
        it("should update the last created exercice, return exercice with same id and not same name and description", (done) => {
          chai.request(url)
          .patch(`/exercice/${newExerciceId}`)
          .set('Accept', 'application/json')
          .send({
              'name': 'exo test updated',
              'description': 'Un test de création d\'un exercice - updated',
              'isBenchmark': false
            })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            chai.assert.equal(res.body.id, newExerciceId)
            res.body.should.have.property('name');
            chai.assert.notEqual(res.body.name, newExerciceName);
            chai.assert.equal(res.body.name, 'exo test updated')
            res.body.should.have.property('description');
            chai.assert.notEqual(res.body.description, newExerciceDescription);
            chai.assert.equal(res.body.description, 'Un test de création d\'un exercice - updated')
            res.body.should.have.property('isBenchmark');
            done()
          })
        })
      })
      
      describe('DELETE /exercice/:id', () => {
        it('should delete the newExercice', (done) => {
          chai.request(url)
          .delete(`/exercice/${newExerciceId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            done()
          })
        })
      })
      
            
      describe("GET exercice just deleted", () => {
        it("should return an error, status 400 ", (done) => {
          chai.request(url)
          .get(`/exercice/${newExerciceId}`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
    })
  }
}