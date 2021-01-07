const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();

function start() {
  if (!process.env.MODE_ENV || !process.env.PORT) {
    console.error(
      'Env variables are missing',
      'veriry that you have set them directly or in .env file'
    );
    process.exit(1);
  } else {
    console.log('Using env variables');
  }
}

const app = express();
const port = process.env.PORT || 7070;
const www = process.env.WWW || './';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.use(express.static(www));
console.log(`serving ${www}`);
app.get('*', (request, response) => {
  response.json('index.html', { root: www });
});

app.listen(port, () => console.log(`listening at port: ${port}`));

module.exports = { start: start };
