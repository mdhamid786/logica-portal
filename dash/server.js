// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./config/db'); 
// require('dotenv').config();
// const next = require('next');

// const app = express();
// const port = process.env.PORT || 5000;


// app.use(cors());
// app.use(express.json());




// app.get('/', (req, res) => {
//   res.send('Hello, API is running!');
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const cors = require('cors');
const next = require('next');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'development';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));



const app = express();
const port =  5000;

app.use(cors());
app.use(express.json());


app.all('*', (req, res) => handle(req, res));

nextApp.prepare().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
