const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 8080
const data = fs.readFileSync(path.join(__dirname, 'quotes.json'), 'utf8')

const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)]

app.get('/', (req, res) => {
  const quotes = JSON.parse(data).quotes
  const quote = getRandomItem(quotes)
  res.send(quote)
})

app.listen(port, console.log(`listening on port ${port}`))
