const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(cors());


function getXCards() {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
  return axios.get(url)
    .then(response => {
      // Assurez-vous de manipuler correctement la réponse pour accéder au tableau des cartes
      const cards = response.data.data.slice(0, 20).map(card => ({
        id: card.id,
        name: card.name,
        imageUrl: card.card_images[0].image_url,
        imageCroppedUrl: card.card_images[0].image_url_cropped,
        ArcheType: card.type
      }));
      return cards;
    })
    .catch(error => {
      console.error(error);
      throw error; // Propager l'erreur pour la gérer plus haut
    });
   
}

app.get('/cards', async (req, res) => {
  try {
    const cards = await getXCards(); // Pas besoin de passer un nombre ici, car on veut toujours les 20 premières cartes
    res.json(cards);
     // Envoie les cartes récupérées au client
  } catch (error) {
    console.error(error); // Log l'erreur sur le serveur
    res.status(500).send({ error: 'An error occurred while fetching the cards' });
  }
});

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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

