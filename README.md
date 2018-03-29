# Build Your Own Backend (BYOB)

To run this repo, clone it down, run ```npm install```, and ```npm start```

## Endpoints
### Locations
- ```GET api/v1/locations```

 Response: ```[{ id: 2,city: "Arvada", county: "Jefferson"}, { id: 3, city: "Aurora", county: "Adams"}, { id: 4, city: "Deer Trail", county: "Adams"}, { id: 5, city: "Denver", county: "Denver"}]```

- ```GET /api/v1/locations/:id```

   Response: ```[{ id: 6, city: "Fort Collins", county: "Larimer" }]```

- ```POST api/v1/locations```

 Parameters:

  ```city: <String>``` required

 ```county: <String>``` required

 Response: ```[{ id: 32 }]```


- ```DELETE api/v1/locations/:id```

 Parameters:

 ```id: <Number>``` required

 Response: ```[{ id: 1 }]```


### Sites

- ```GET api/v1/sites```

 Response: ```[{ id: 1, name: "Arvada Treatment Center",location_id: 2, info: "https://echo.epa.gov/detailed-facility-report?fid=110027855408"},{id: 11,name: "Evraz Rocky Mou# Build Your Own Backend (BYOB)```

To run this repo, clone it down, run ```npm install```, and ```npm start```

## Endpoints
### Locations
- ```GET api/v1/locations```

 Response: ```[{ id: 2,city: "Arvada", county: "Jefferson"}, { id: 3, city: "Aurora", county: "Adams"}, { id: 4, city: "Deer Trail", county: "Adams"}, { id: 5, city: "Denver", county: "Denver"}]```

- ```GET /api/v1/locations/:id```

Response: ```[{ id: 6, city: "Fort Collins", county: "Larimer" }]```

- ```POST api/v1/locations```

 Parameters:

  ```city: <String>``` required

 ```county: <String>``` required

 Response: ```[{ id: 32 }]```

  ```PATCH api/v1/locations/:id```

 Parameters:

  ```city: <String>```

  ```county: <String>```

Response ```[{ id: <Number>}]```


- ```DELETE api/v1/locations/:id```

 Parameters:

 ```id: <Number>``` required

 Response: ```[{ id: 1 }]```

### Sites

- ```GET api/v1/sites```

 Response: ```[{ id: 1, name: "Arvada Treatment Center",location_id: 2, info: "https://echo.epa.gov/detailed-facility-report?fid=110027855408"},{id: 11,name: "Evraz Rocky Mountain Steel", location_id: 9, info: "https://echo.epa.gov/detailed-facility-report?fid=110000467833"}, {id: 18, name: "Kodak Colorado Div", location_id: 12, info: "https://echo.epa.gov/detailed-facility-report?fid=110000467502"}, { id: 28, name: "Ramp Ind Inc", location_id: 5, info: "https://echo.epa.gov/detailed-facility-report?fid=110000621499"}]```


- ```GET /sites/:id```

 Response
```[{ id: 13, name: "Explosives Tech International", location_id: 10, info: "https://echo.epa.gov/detailed-facility-report?fid=110000610447 }]```


- ```POST api/v1/sites```

 Parameters:

 ```name: <String>``` url required

 ```location_id: <Number>``` required

 Response: ```[{ id: 57}]```

 ```PATCH api/v1/sites/:id```

 Parameters:

  ```location_id: <Number>```

  ```name: <String>```

  ```info: <String>```

Response ```[{ id: <Number>}]```


- ```DELETE api/v1/sites/:id```

 Parameters:

 ```id: <Number>``` required

 Response:
```[{ id: 8 }]```


- ```GET /sites/:id```

 Response
```[{ id: 13, name: "Explosives Tech International", location_id: 10, info: "https://echo.epa.gov/detailed-facility-report?fid=110000610447 }]```


- ```POST api/v1/sites```

 Parameters:

 ```name: <String>``` url required

 ```location_id: <Number>``` required

 Response: ```[{ id: 57}]```


- ```DELETE api/v1/sites/:id```

 Parameters:

 ```id: <Number>``` required

 Response:
```[{ id: 8 }]```
