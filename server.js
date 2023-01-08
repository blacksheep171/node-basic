// required library
const express = require('express')
// create instance
const app = express()
// create port params
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! 2023')
})

app.get('/home', (req, res) => {
    res.send(`Welcome Home!`)
  })
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})