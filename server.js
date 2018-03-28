const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static('public'));

//LOCATIONS
app.get('/api/v1/locations', (request, response) => {
  database('locations').select()
  .then(locations => response.status(200).json(locations))
  .catch(error => {
    return response.status(500).json({ error });
  })
})

app.get('/api/v1/locations/:id', (request, response ) => {
  const { id } = request.params;

  database('locations').where('id', id).select()
  .then(location => {
    if (location.length > 0) {
      response.status(200).json(location)
    } else {
      response.status(404).json({
        error: `Could not find location with id: ${id}`
      })
    }
  })
  .catch( error => {
    response.status(500).json({ error })
  })
})


app.post('/api/v1/locations', (request, response) => {
  const location = request.body;

  for (let requiredParameter of ['city', 'county']) {
    if(!location[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: ${requiredParameter}: <String>. You're missing a "${requiredParameter}" property.`
      });
    }
  }

  database('locations').insert(location, 'id')
    .then(location => {
      response.status(201).json({ id: location[0] })
    })
    .catch( error => {
      response.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${ app.get('port') }`);
});

module.exports = app;