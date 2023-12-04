const express = require('express')
const helmet = require('helmet')
const EventEmitter = require('events');
const app = express()
const port = 3000

app.use(helmet())

let translate_count = 0

// Create an event emitter
const eventEmitter = new EventEmitter();

app.get('/', (req, res) => {
  res.json({ translate_count });
})

app.post('/translation', (req, res) => {
  translate_count++;

  // Emit an event when the translation count is updated
  eventEmitter.emit('translationUpdated', translate_count);

  res.status(201).send()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Event listener to update the counter on root
eventEmitter.on('translationUpdated', (count) => {
  // Update the counter on root
  app.get('/', (req, res) => {
    res.json({ translate_count: count });
  })
})
