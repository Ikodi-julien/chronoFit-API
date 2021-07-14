const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

module.exports = {
  testTrainingDone: (url) => {
    describe("TrainingDone endpoints", () => {
      let trainingDoneLength = 0;
      let newTrainingDoneDuration, newTrainingDoneUserId, newTrainingDoneTrainingId;
      
      describe("GET /trainingsDone", () => {
        it("should return all trainingDone with training details", (done) => {
          chai.request(url)
          .get("/trainingsDone")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.greaterThan(1);
            res.body[0].should.have.property('training');
            res.body[0].training.should.have.property('exercices');
            trainingDoneLength = res.body.length
            done()
          })
        })
      })
      
      describe("GET /trainingDone/:id", () => {
        it("should return a random trainingDone", (done) => {
          chai.request(url)
          .get(`/trainingDone/${Math.ceil(Math.random() * trainingDoneLength)}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('userId');
            res.body.should.have.property('trainingId');
            res.body.should.have.property('duration');
            res.body.should.have.property('by');
            res.body.should.have.property('results');
            res.body.should.have.property('training');
            res.body.training.should.have.property('exercices');
            done()
          })
        })
      })
      
            
      describe("GET /trainingDone/:id doesn't exists", () => {
        it("should return an error, status 400", (done) => {
          chai.request(url)
          .get(`/trainingDone/${trainingDoneLength + 10}`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
      describe("GET /trainingDone/:id where id is a letter", () => {
        it("should return an error, status 400", (done) => {
          chai.request(url)
          .get(`/trainingDone/test`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
      describe("POST /trainingDone", () => {
        it("should create a trainingDone", (done) => {
          chai.request(url)
          .post(`/trainingDone`)
          .set('Accept', 'application/json')
          .send({
              'userId': 2,
              'trainingId': 2,
              'duration': 100
            })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('userId');
            res.body.should.have.property('trainingId');
            res.body.should.have.property('duration');
            newTrainingDoneId = res.body.id;
            newTrainingDoneUserId = res.body.userId;            
            newTrainingDoneTrainingId = res.body.trainingId;
            newTrainingDoneDuration = res.body.duration
            done()
          })
        })
      })
      
      describe("POST /trainingDone empty field", () => {
        it("should return status 400", (done) => {
          chai.request(url)
          .post(`/trainingDone`)
          .set('Accept', 'application/json')
          .send({
              'duration': '',
            })
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })

      describe("PATCH /trainingDone/:id", () => {
        it("should update the last created trainingDone, return trainingDone with same id and not same name and description", (done) => {
          chai.request(url)
          .patch(`/trainingDone/${newTrainingDoneId}`)
          .set('Accept', 'application/json')
          .send({
            'userId': 1,
            'trainingId': 1,
            'duration': 90
            })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('userId');
            res.body.should.have.property('trainingId');
            res.body.should.have.property('duration');
            
            chai.assert.equal(res.body.id, newTrainingDoneId);
            chai.assert.notEqual(res.body.userId, newTrainingDoneUserId);
            chai.assert.notEqual(res.body.trainingId, newTrainingDoneTrainingId);
            chai.assert.notEqual(res.body.duration, newTrainingDoneDuration);
            chai.assert.equal(res.body.duration, 90);

            done()
          })
        })
      })
      
      describe('DELETE /trainingDone/:id', () => {
        it('should delete the newTrainingDone', (done) => {
          chai.request(url)
          .delete(`/trainingDone/${newTrainingDoneId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            done()
          })
        })
      })

      describe("GET trainingDone just deleted", () => {
        it("should return an error, status 400 ", (done) => {
          chai.request(url)
          .get(`/trainingDone/${newTrainingDoneId}`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
    })
  }
}