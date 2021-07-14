const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

module.exports = {
  testTraining: (url) => {
    describe("Training endpoints", () => {
      let trainingLength = 0;
      let newTrainingId, newTrainingName, newTrainingUserId, newTrainingCategoryId;
      
      describe("GET /trainings", () => {
        it("should return all trainings", (done) => {
          chai.request(url)
          .get("/trainings")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.greaterThan(1);
            trainingLength = res.body.length
            done()
          })
        })
      })
      
      describe("GET /training/:id", () => {
        it("should return a random training", (done) => {
          chai.request(url)
          .get(`/training/${Math.ceil(Math.random() * trainingLength)}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('userId');
            res.body.should.have.property('categoryId');
            res.body.should.have.property('name');
            res.body.should.have.property('isBenchmark');
            done()
          })
        })
      })
      
            
      describe("GET /training/:id doesn't exists", () => {
        it("should return an error, status 400", (done) => {
          chai.request(url)
          .get(`/training/${trainingLength + 10}`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
                  
      describe("GET /training/:id where id is a letter", () => {
        it("should return an error, status 400", (done) => {
          chai.request(url)
          .get(`/training/test`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
      
            
      describe("POST /training", () => {
        it("should create a training", (done) => {
          chai.request(url)
          .post(`/training`)
          .set('Accept', 'application/json')
          .send({
              'name': 'exo test',
              'userId': 2,
              'categoryId': 2,
              'isBenchmark': false
            })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            newtrainingId = res.body.id;
            res.body.should.have.property('name');
            newtrainingName = res.body.name;            
            res.body.should.have.property('userId');
            newtrainingUserId = res.body.userId;            
            res.body.should.have.property('categoryId');
            newtrainingCategoryId = res.body.categoryId;
            res.body.should.have.property('isBenchmark');
            done()
          })
        })
      })
      
      describe("POST /training empty field", () => {
        it("should return status 400", (done) => {
          chai.request(url)
          .post(`/training`)
          .set('Accept', 'application/json')
          .send({
              'name': '',
            })
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })

      describe("PATCH /training/:id", () => {
        it("should update the last created training, return training with same id and not same name and description", (done) => {
          chai.request(url)
          .patch(`/training/${newtrainingId}`)
          .set('Accept', 'application/json')
          .send({
              'name': 'training test updated',
              'userId': 1,
              'categoryId': 1,
              'isBenchmark': false
            })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            chai.assert.equal(res.body.id, newtrainingId)
            res.body.should.have.property('userId');
            chai.assert.equal(res.body.userId, newtrainingUserId)
            res.body.should.have.property('categoryId');
            chai.assert.equal(res.body.categoryId, newtrainingCategoryId)
            res.body.should.have.property('name');
            chai.assert.notEqual(res.body.name, newtrainingName);
            chai.assert.equal(res.body.name, 'training test updated')
            res.body.should.have.property('isBenchmark');
            done()
          })
        })
      })
      
      describe('DELETE /training/:id', () => {
        it('should delete the newtraining', (done) => {
          chai.request(url)
          .delete(`/training/${newtrainingId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            done()
          })
        })
      })
      
      describe("GET training just deleted", () => {
        it("should return an error, status 400 ", (done) => {
          chai.request(url)
          .get(`/training/${newtrainingId}`)
          .end((err, res) => {
            res.should.have.status(400);
            done()
          })
        })
      })
    })
  }
}