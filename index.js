const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const EventEmitter = require('events');
const app = express();
const port = 3000;

app.use(helmet());

let translate_count = 0;

// Create an event emitter
const eventEmitter = new EventEmitter();

app.use(cors({origin: true}))
app.get('/', (req, res) => {
  res.json({ translate_count });
});

app.post('/translation', (req, res) => {
  translate_count++;

  // Emit an event when the translation count is updated
  eventEmitter.emit('translationUpdated', translate_count);

  res.status(201).send();
});

// Event listener to log the updated counter
eventEmitter.on('translationUpdated', (count) => {
  console.log(`Translation count updated: ${count}`);

  // You can update the counter globally here if needed
  // translate_count = count;
  // And respond to requests with the updated count
  // app.get('/', (req, res) => {
  //   res.json({ translate_count: count });
  // });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
