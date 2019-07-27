### Build Your Own Backend (BYOB)
Module 4 project | Turing School of Software & Design

---

This is an API of Colorado superfund locations with links to current status and information on various sites.

#### Setup
Clone this repo
```
git clone https://github.com/michellehoffman/build-your-own-backend.git
```

Install packages
```
npm install
```

Start the app
```
npm start
```

## Endpoints
### Locations

---

#### GET  `api/v1/locations`

Response: 
```
[{ id: 2,city: "Arvada", county: "Jefferson"}, { id: 3, city: "Aurora", county: "Adams"}, { id: 4, city: "Deer Trail", county: "Adams"}, { id: 5, city: "Denver", county: "Denver"}]
```

#### GET  `/api/v1/locations/:id`

Response: 
```
[{ id: 6, city: "Fort Collins", county: "Larimer" }]
```

#### POST  `api/v1/locations`

Required parameters:
```
city: <String>
county: <String>
```

Response: 
```
[{ id: 32 }]
```

#### PATCH  `api/v1/locations/:id`

Optional parameters:
```
city: <String>
county: <String>
```

Response:
```
[{ id: <Number>}]
```


#### DELETE  `api/v1/locations/:id`

Required parameter:
```
id: <Number>
```

Response: 
```
[{ id: 1 }]
```

### Sites

---

#### GET  `api/v1/sites`

Response: 
```
[{ id: 1, name: "Arvada Treatment Center",location_id: 2, info: "https://echo.epa.gov/detailed-facility-report?fid=110027855408"},{id: 11,name: "Evraz Rocky Mountain Steel", location_id: 9, info: "https://echo.epa.gov/detailed-facility-report?fid=110000467833"}, {id: 18, name: "Kodak Colorado Div", location_id: 12, info: "https://echo.epa.gov/detailed-facility-report?fid=110000467502"}, { id: 28, name: "Ramp Ind Inc", location_id: 5, info: "https://echo.epa.gov/detailed-facility-report?fid=110000621499"}]
```

#### GET  `/sites/:id`

Response:
```
[{ id: 13, name: "Explosives Tech International", location_id: 10, info: "https://echo.epa.gov/detailed-facility-report?fid=110000610447 }]
```

#### POST  `api/v1/sites`

Required parameters:
```
name: <String> (url required)
location_id: <Number>
```

Response: 
```
[{ id: 57}]
```

#### PATCH  `api/v1/sites/:id`

Optional parameters:
```
location_id: <Number>
name: <String>
info: <String>
```

Response:
```
[{ id: <Number>}]
```


#### DELETE  `api/v1/sites/:id`

Required parameters:
```
id: <Number>
```

Response:
```
[{ id: 8 }]
```

### Custom Query

---

#### GET  `/api/v1/locations?QUERY=QUERYSEARCH`

Parmeters:
```
city: <String>
county: <String>
```
_*at least one of the above parameters must be present_

Response:
```
[{ id: <Number>, city: <String>, county: <String>}]
```
