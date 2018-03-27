const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Client Routes', () => {
  it('should return the homepage with text', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch(error => {
      throw error;
    });
  });

  it('should return a 404 if page does not exist', () => {
    return chai.request(server)
    .get('/PANTS')
    .then(response => {
      response.should.have.status(404);
    })
    .catch(error => {
      throw error;
    });
  });
});

describe('API Routes', () => {
  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done();
        })
      })
    })
  })

  describe('GET /api/v1/locations', () => {
    it('should return all of the locations', () => {
      return chai.request(server)
      .get('/api/v1/locations')
      .then( response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(22);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('city');
        response.body[0].city.should.equal('Littleton');
        response.body[0].should.have.property('county');
        response.body[0].county.should.equal('Jefferson');
      })
      .catch(error => {
        throw error;
      })
    })
  })

  describe('POST /api/v1/locations', () => {
    it('should create a new location', () => {
      return chai.request(server)
      .post('/api/v1/locations')
      .send({
        city: 'Glenwood Springs',
        county: 'Garfield'
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.a.property('id');
        response.body.id.should.equal(23);
      })
      .catch( error => {
        throw error;
      })
    })

    it('should return a 422 error if a body property is missing', () => {
      return chai.request(server)
        .post('/api/v1/locations')
        .send({})
        .then( response => {
          response.should.have.status(422);
          response.body.should.have.property('error');
          response.body.error.should.equal("Expected format: city: <String>. You're missing a \"city\" property.")
        })
        .catch( error => {
          throw error;
        })
    })
  })


})