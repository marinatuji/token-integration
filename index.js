const uuidv4 = require('uuid').v4;
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3029;
app.use(cors({
    origin: '*'
}));

const persons = [{ integrationId: '15b0b61a-d549-4985-996b-87ef68638358', name: 'Sherlock Holmes', address: '221B Baker Street' }];
let tokens = [];

app.get('/token/:integrationId', (req, res) => {

  if(!persons.some(({ integrationId }) => integrationId === req.params.integrationId)) {
    res.status(404).send("Integration Id not found");
  }
  
  const token = uuidv4();
  tokens[token] = req.params.integrationId;
  res.send({token});
});

app.get('/person/:token', (req, res) => {
  const target = persons.find(({integrationId}) => integrationId === tokens[req.params.token]);

  if(!target) {
    res.status(400).send("Invalid token");
  }
  
  tokens = tokens.filter((integrationId) => integrationId !== target.integrationId);
  res.send(target);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
