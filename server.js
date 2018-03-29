const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'definitely not a secret key';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static('public'));

const checkAuth = (request, response, next) => {
  const { token } = request.body;

  if (!token) {
    return response.status(403).json({
      error: "You must be authorized to access this endpoint"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    next()
  } catch (error) {
    return response.status(403).json({error: "Invalid token"})
  }
}

//AUTHORIZATION
app.post('/authenticate', ( request, response ) => {
  const payload = request.body;

  for (let requiredParameter of ['email', 'appName'] ) {
    if(!payload[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: {email: <String>, appName: <String>}. You're missing a ${requiredParameter} property`});
    }
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY);

  response.status(201).json({ token });
});

//LOCATIONS
app.get('/api/v1/locations', (request, response) => {
  const { county } = request.query;

  if (!county) {
    database('locations').select()
    .then(locations => response.status(200).json(locations))
    .catch(error => {
      return response.status(500).json({ error });
    })
  } else {
    database('locations').where('county', county)
    .then(locations => {
      if(locations.length > 0) {
        response.status(200).json(locations)
      } else {
        response.status(404).json({
          error: `Could not find locations in county: ${ county }`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    });
  }
})

app.get('/api/v1/locations/:id', (request, response ) => {
  const { id } = request.params;

  database('locations').where('id', id).select()
  .then(location => {
    if (location.length > 0) {
      response.status(200).json(location)
    } else {
      response.status(404).json({
        error: `Could not find location with id: ${ id }`
      })
    }
  })
  .catch( error => {
    response.status(500).json({ error })
  })
})

app.post('/api/v1/locations', checkAuth, (request, response) => {
  const { city, county } = request.body;
  const location = {city, county}
  for (let requiredParameter of ['city', 'county']) {
    if(!location[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { city: <String>, county: <String> }. You're missing a ${requiredParameter} property.`
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

app.patch('/api/v1/locations/:id', (request, response) => {
  const { id } = request.params;
  const locationChange = request.body;
  database('locations').where('id', id).update(locationChange)
  .then( location => {
    if (location) {
      response.status(200).json({id});
    } else {
      response.status(404).json({ error: `No record with id: ${id} to patch` })
    }
  })
  .catch( error => {
    response.status(500).json({ error });
  })
})

app.delete('/api/v1/locations/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('sites').where('location_id', id).del()
  .then (() => {
    database('locations').where('id', id).del()
    .then( location => {
      if ( location ) {
        response.status(204).json(location);
      } else {
        response.status(404).json({ error: `No record with id: ${id} to delete`});
      }
    })
    .catch( error => {
      response.status(500).json({ error });
    })
  })
})

// SITES

app.get('/api/v1/sites', (request, response) => {
  database('sites').select()
  .then(sites => response.status(200).json(sites))
  .catch(error => response.status(500).json({ error }));
})

app.get('/api/v1/sites/:id', (request, response) => {
  const { id } = request.params;

  database('sites').where('id', id).select()
  .then(site => {
    if (site.length > 0) {
      response.status(200).json(site)
    } else {
      response.status(404).json({ 
        error: `Could not find site with id: ${ id }` 
      })
    }
  })
  .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/sites', checkAuth, (request, response) => {
  const { name, location_id, info } = request.body;
  const site = { name, location_id, info }

  for (let requiredParameter of ['name', 'location_id']) {
    if(!site[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { name: <String>, location_id: <Number> }. You're missing a ${requiredParameter} property.`
      });
    }
  }

  database('sites').insert(site, 'id')
  .then(site => response.status(201).json({ id: site[0] }))
  .catch(error => response.status(500).json({ error }))
})

app.delete('/api/v1/sites/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('sites').where('id', id).del()
  .then(site => {
    if (site) {
      response.status(204).json(site)
    } else {
      response.status(404).json({
        error: `No site with id: ${ id } to delete`
      })
    }
  })
  .catch(error => response.status(500).json({ error }))
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${ app.get('port') }`);
});

module.exports = app;