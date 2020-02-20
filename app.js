import express from 'express'
import db from './db/db'

const app = express()

app.get('/api/v1/todos', (err, req, res, next) => {
  console.log(err)
  res.status(200).send({
    success: 'true',
    message: 'todos retrievessd',
    todos: db
  })
  console.log('oops')
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
