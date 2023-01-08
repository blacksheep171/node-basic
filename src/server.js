// required library
import express from 'express';
import configViewEngine from './configs/viewEngine';
// create instance
const app = express()
// create port params
const port = 3000

configViewEngine(app);
app.get('/', (req, res) => {
  res.render('test/index.ejs')
})

app.get('/home', (req, res) => {
    res.send(`Welcome Home!`)
})
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})