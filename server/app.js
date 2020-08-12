import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import '@babel/polyfill';
import 'esm';
import pg from 'pg';


const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));


let conString = "postgres://hialrgzo:i4CM7-9ChU_3QUZTqrdgDRHTaTMMcG5X@raja.db.elephantsql.com:5432/hialrgzo" 
const client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {f
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log('connected to database');
    client.end();
  });
});
app.get('/', (req, res) => res.status(301).redirect('/api/v1'));

app.get('/api/v1', (req, res) =>
  res.status(200).send({
    message: 'Welcome to Quick-Credit version 1',
  }),
);

// Throw error when user enters wrong Endpoints
app.use((req, res) => res.status(404).send({
  error: 'Oops! Endpoint not found, Please Check that you are entering the right thing!',
}));

app.use((err, req, res, next) => {
  res.status(500).send({
    error: 'Invalid Request! Please Check that you are entering the right thing!',
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is live on PORT: ${port}`);
});

export default app;