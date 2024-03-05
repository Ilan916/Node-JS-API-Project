const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(cors());


// function getXCards() {
//   const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
//   return axios.get(url)
//     .then(response => {
//       const cards = response.data.data.slice(0, 20).map(card => ({
//         id: card.id,
//         name: card.name,
//         imageUrl: card.card_images[0].image_url,
//         imageCroppedUrl: card.card_images[0].image_url_cropped,
//         ArcheType: card.type
//       }));
//       return cards;
//     })
//     .catch(error => {
//       console.error(error);
//       throw error;
//     });
   
// }

// app.get('/cards', async (req, res) => {
//   try {
//     const cards = await getXCards();
//     res.json(cards);
     
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'An error occurred while fetching the cards' });
//   }
// });

app.get('/card/:id', async (req, res) => {
  const cardId = req.params.id;
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}`;

  try {
    const response = await axios.get(url);
    if (response.data.data && response.data.data.length > 0) {
      const cardDetails = response.data.data[0]; // Prend la première carte dans la réponse
      res.json(cardDetails);
    } else {
      res.status(404).send({ message: 'Carte non trouvée' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur est survenue lors de la récupération des détails de la carte' });
  }
});





function getXCards(page = 1, limit = 10) {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
  return axios.get(url)
    .then(response => {
      const totalCards = response.data.data.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const cardsForPage = response.data.data.slice(startIndex, endIndex).map(card => ({
        id: card.id,
        name: card.name,
        imageUrl: card.card_images[0].image_url,
        imageCroppedUrl: card.card_images[0].image_url_cropped,
        ArcheType: card.type
      }));

      // Renvoie les cartes pour la page actuelle et le total des cartes
      return { cards: cardsForPage, total: totalCards };
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}



app.get('/cards', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  try {
    const { cards, total } = await getXCards(page, limit);
    res.json({
      page,
      limit,
      total, // Le nombre total de cartes disponibles
      cards // Les cartes pour la page demandée
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching the cards' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

