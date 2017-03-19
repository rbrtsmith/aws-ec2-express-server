const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
app.set('view engine', 'ejs');


const port = 8080
const file = path.join(__dirname, 'quotes.json')
const data = fs.readFileSync(file, 'utf8')
const quotes = JSON.parse(data)

const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)]

app.get('/', (req, res) => {
  res.render('index', { quotes })
})

app.get('/:quotePath', (req, res) => {
  const quote = quotes.filter(quote => quote.path === req.params.quotePath)[0]
  console.log(quote)
  res.render('quote', { quote })
})

app.listen(port, console.log(`listening on port ${port}`))
