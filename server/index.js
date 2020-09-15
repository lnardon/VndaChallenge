const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const app = express()
const port = 8888

app.use(cors())
app.use(bodyParser.json())

app.get('/getUsers', async (req, res) => {
  let response = await fetch('https://demo.vnda.com.br/api/v2/users', {
    method: 'GET',
    headers: {
      Authorization: 'Token token=agz7FqcWD2PU6NBsoqH2JTuS'
    }
  })
  let parsedResponse = await response.json()
  res.json(parsedResponse)
})

app.post('/registerUser', async (req, res) => {
  let response = await fetch('https://demo.vnda.com.br/api/v2/users', {
    method: 'POST',
    headers: {
      Authorization: 'Token token=agz7FqcWD2PU6NBsoqH2JTuS'
    },
    body: req.body
  })
  console.log(response)
  res.json(response)
})

app.post('/updateUser', async (req, res) => {
  let response = await fetch(
    `https://demo.vnda.com.br/api/v2/users/${req.body.id}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=agz7FqcWD2PU6NBsoqH2JTuS'
      },
      body: req.body
    }
  )
  console.log(req.body)
  res.json(response)
})

app.listen(process.env.PORT || port)
