const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const { swaggerDocs: V1SwaggerDocs } = require("./api-doc/swagger"); //
require('dotenv').config({ path: require('find-config')('.env') });

const app = express();
const PORT =  process.env.PORT || 3000;
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json());  // parse application/json

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', routes);

app.listen(PORT, function(err) {
  if (err) console.log(err)
  console.log(`App running on http://localhost:${PORT}.`)
  V1SwaggerDocs(app, PORT);
})

module.exports = app;




