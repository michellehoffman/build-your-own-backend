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

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${ app.get('port') }`);
});

module.exports = app;