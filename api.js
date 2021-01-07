const dbOperations = require('./services/user.service');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { pool } = require('mssql');
const { request } = require('express');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
  console.log('middleware');
  next();
});

router.route('/users').get((request, response) => {
  dbOperations.getUsers().then((result) => {
    return response.json(result[0]);
  });
});

router.route('/users/:id').get((request, response) => {
  dbOperations.getUserById(request.params.id).then((result) => {
    return response.json(result[0]);
  });
});

router.route('/users').post((request, response) => {
  let user = { ...request.body };
  dbOperations.createUser(user).then((result) => {
    return response.statusCode(201).json(result[0]);
  });
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log('User api is running on ' + port);
