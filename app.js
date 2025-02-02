const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.all('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', beersFromApi);
    })
    .catch(error => console.log(error));
});

/*
app.all('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responsefromAPI => {
      console.log('random beers:', responsefromAPI);
      res.render('random-beer', { random: responsefromAPI });
    })
    .catch(error => console.log(error));
});
*/
app.all('/random-beer', async (req, res) => {
  try {
    const apiResponse = await punkAPI.getRandom();
    res.render('random-beer', { random: apiResponse });
  } catch (err) {
    res.send(err);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
