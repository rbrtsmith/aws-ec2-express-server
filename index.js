const express = require('express')

const app = express()
const port = process.argv[2] || 8000

app.get('/', (req, res) => {
  res.send('Hello AWS')
})

app.listen(port, console.log(`listening on port ${port}`))
