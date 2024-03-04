const cors = require('cors');
const express = require('express')
const axios = require('axios')
const app = express()
const port = 3001

async function getXCards(number) {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;

  return axios.get(url)
    .then(response => {
      const cards = response.data.data.slice(0, number).map(card => ({
        id: card.id,
        name: card.name,
        imageCropped: card.card_images[0].image_url_cropped
      }));
      return cards;
    })
    .catch(error => {
      console.error(error);
    });
}

async function getArchetypeCards(archetype) {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${encodeURIComponent(archetype)}`;

  return axios.get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

app.get('/archetype/:name', async (req, res) => { 
  try {
    const cardInfo = await getArchetypeCards(req.params.name) 
    res.send(cardInfo)
  } catch (error) {
    res.status(500).send({ error: 'An error occurred' })
  }
})

async function getCardInfo(name) {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(name)}`;

  return axios.get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

app.get('/name/:name', async (req, res) => { 
  try {
    const archetypeCards = await getCardInfo(req.params.name)
    res.send(archetypeCards) 
  } catch (error) {
    res.status(500).send({ error: 'An error occurred' })
  }
})

app.get('/limit', async (req, res) => { 
  try {
    const listCards = await getXCards(req.params.number)
    res.send(listCards) 
  } catch (error) {
    res.status(500).send({ error: 'An error occurred' })
  }
}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})