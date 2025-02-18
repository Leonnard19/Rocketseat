const express = require('express')


const app = express()

app.use(express.json())

app.get('/courses', (request, response) => {
  const query = request.query
  console.log(query)
  return response.json([
    'curso1',
    'curso2',
    'curso3'])
})

app.post('/courses', (request, response) => {
  const body = request.body
  console.log(body)
  return response.json(['curso1', 'curso2', 'curso3', 'curso4'])
})

app.put('/courses/:id', (request, response) => {
  const { id } = request.params
  console.log(id)
  return response.json(['curso6', 'curso2', 'curso3', 'curso4'])
})

app.patch('/courses/:id', (request, response) => {
  return response.json(['curso6', 'curso7', 'curso3', 'curso4'])
})

app.delete('/courses/:id', (request, response) => {
  return response.json(['curso6', 'curso7', 'curso4'])
})

app.listen(3333)