const express = require('express')
const axios = require('axios')
const app = express()
const port = 3001



function getArchetypeCards(archetype) {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${encodeURIComponent(archetype)}`;

  return axios.get(url) // Retourner la Promesse
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

app.get('/archetype/:name', async (req, res) => { 
  try {
    const archetypeCards = await getArchetypeCards(req.params.name) 
  } catch (error) {
    res.status(500).send({ error: 'An error occurred' })
  }
})

function getCardInfo(name) {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(name)}`;

  return axios.get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

app.get('/', async (req, res) => { 
  try {
    const cardInfo = await getCardInfo('Dark Magician') 
    res.send(cardInfo)
  } catch (error) {
    res.status(500).send({ error: 'An error occurred' })
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})