const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

module.exports = {
  testCategory: (url) => {
    describe("Category", () => {
      describe("GET /categories", () => {
        it("should return all categories", (done) => {
          chai.request(url)
          .get("/categories")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.greaterThan(1);
            done()
          })
        })
      })
      
      describe("GET /category/:id", () => {
        it("should return first category", (done) => {
          chai.request(url)
          .get("/category/1")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            done()
          })
        })
      })
    })
  }
}