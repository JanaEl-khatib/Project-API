const express = require('express')
const helmet = require('helmet')
const app = express()
const port = 3000

app.use(helmet()) 

let translate_count = 0

app.get('/', (req, res) => {
  res.json({translate_count});
})

app.post('/translation', (req, res) => {
  translate_count++
  res.status(201).send()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})