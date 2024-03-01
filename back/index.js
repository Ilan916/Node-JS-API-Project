const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000



axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Dark%20Magician')
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.error(error)
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})