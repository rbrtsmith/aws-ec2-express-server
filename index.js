const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const slug = require('slug')
const uuid = require('node-uuid').v4

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public', '/assets/')));

const port = 8080
const file = path.join(__dirname, 'quotes.json')
const data = fs.readFileSync(file, 'utf8')
let quotes = JSON.parse(data)

const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)]

const writeData = (data, cb) => fs.writeFile(file, JSON.stringify(data), (err, res) => {
  if (err) { return console.error(err) }
  console.log('res', res)
  cb()
})

app.get('/', (req, res) => {
  res.render('index', { quotes })
})

app.post('/', ({ body: { quote, movie, description }}, res) => {
  const path = slug(quote)
  const data = {
    id: uuid(),
    path,
    quote,
    movie,
    description
  }
  quotes.push(data)
  writeData(quotes, () => {
    res.status(201).send({
      data,
      redirect: '/'
    })
  })
})

app.delete('/', (req, res) => {
  quotes = quotes.filter(q => q.id !== req.body.id)
  writeData(quotes, () => {
    res.status(201).send({
      data,
      redirect: '/'
    })
  })
})

app.get('/quote/:quotePath', ({ params: { quotePath} }, res) => {
  const quote = quotes.find(q => q.path === quotePath)
  res.render('quote', { quote })
})

app.get('/random-quote', (req, res) => {
  const quote = getRandomItem(quotes)
  res.render('randomQuote', { quote })
})

app.get('/add-quote', (req, res) => {
  res.render('addQuote')
})


app.listen(port, console.log(`listening on port ${port}`))
