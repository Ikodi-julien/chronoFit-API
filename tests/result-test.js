const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

module.exports = {
  testResult: (url) => {
    describe("Result endpoints", () => {
      let resultLength = 0;
      let newResultUserId, newResultExerciceId, newResultTrainingDoneId, newResultDuration, newResultWeight, newResultReps;
      
      describe("GET /results", () => {
        it("should return all Result with exercice details", (done) => {
          chai.request(url)
          .get("/results")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.greaterThan(1);
            res.body[0].should.have.property('exercice');
            res.body[0].should.have.property('user');
            resultLength = res.body.length
            done()
          })
        })
      })
      
      describe("GET /result/:id", () => {
        it("should return a random Result", (done) => {
          chai.request(url)
          .get(`/result/${Math.ceil(Math.random() * resultLength)}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('userId');
            res.body.should.have.property('exerciceId');
            res.body.should.have.property('trainingDoneId');
            res.body.should.have.property('duration');
            res.body.should.have.property('weight');
            res.body.should.have.property('reps');
            res.body.should.have.property('exercice');
            res.body.should.have.property('user');
            res.body.should.have.property('trainingDoneOrigin');
            res.body.trainingDoneOrigin.should.have.property('training');
            done()
          })
        })
      })
      
            
      describe("GET /result/:id doesn't exists", () => {
        it("should return an error, status 400", (done) => {
          chai.request(url)
          .get(`/result/${resultLength + 10}`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
      describe("GET /result/:id where id is a letter", () => {
        it("should return an error, status 400", (done) => {
          chai.request(url)
          .get(`/result/test`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
      describe("POST /result", () => {
        it("should create a Result", (done) => {
          chai.request(url)
          .post(`/result`)
          .set('Accept', 'application/json')
          .send({
              'userId': 2,
              'exerciceId': 2,
              'trainingDoneId': 2,
              'duration': 100,
              'weight': 15,
              'reps': 10,
            })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('userId');
            res.body.should.have.property('exerciceId');
            res.body.should.have.property('trainingDoneId');
            res.body.should.have.property('duration');
            res.body.should.have.property('weight');
            res.body.should.have.property('reps');
            
            newResultId = res.body.id;
            newResultExerciceId = res.body.exerciceId;
            newResultUserId = res.body.userId;            
            newResultTrainingDoneId = res.body.trainingId;
            newResultDuration = res.body.duration;
            newResultWeight = res.body.weight;
            newResultReps = res.body.reps;
            
            done()
          })
        })
      })
      
      describe("POST /result empty field", () => {
        it("should return status 400", (done) => {
          chai.request(url)
          .post(`/result`)
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

      describe("PATCH /result/:id", () => {
        it("should update the last created Result, return Result with same id and not same name and description", (done) => {
          chai.request(url)
          .patch(`/result/${newResultId}`)
          .set('Accept', 'application/json')
          .send({
            'userId': 3,
            'exerciceId': 3,
            'trainingDoneId': 3,
            'duration': 50,
            'weight': 10,
            'reps': 5,
            })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('userId');
            res.body.should.have.property('exerciceId');
            res.body.should.have.property('trainingDoneId');
            res.body.should.have.property('duration');
            res.body.should.have.property('weight');
            res.body.should.have.property('reps');
            
            chai.assert.equal(res.body.id, newResultId);
            chai.assert.notEqual(res.body.userId, newResultUserId);
            chai.assert.notEqual(res.body.exerciceId, newResultExerciceId);
            chai.assert.notEqual(res.body.trainingDoneId, newResultTrainingDoneId);
            chai.assert.notEqual(res.body.duration, newResultDuration);
            chai.assert.equal(res.body.duration, 50);
            chai.assert.notEqual(res.body.weight, newResultWeight);
            chai.assert.notEqual(res.body.reps, newResultReps);

            done()
          })
        })
      })
      
      describe('DELETE /result/:id', () => {
        it('should delete the newResult', (done) => {
          chai.request(url)
          .delete(`/result/${newResultId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            done()
          })
        })
      })

      describe("GET Result just deleted", () => {
        it("should return an error, status 400 ", (done) => {
          chai.request(url)
          .get(`/result/${newResultId}`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
    })
  }
}