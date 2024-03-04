import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListCard({limit}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Remplace 'http://localhost:3001/cards' par l'URL de ton serveur backend si différente
    axios.get('http://localhost:3001/cards')
      .then(response => {
        setCards(response.data); // Met à jour l'état avec les données des cartes
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des cartes:", error);
      });
  }, []); // Le tableau vide indique que cet effet ne s'exécute qu'une fois, au montage du composant

  return (
    <div>
      <h1>20 Premières Cartes Yu-Gi-Oh</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map(card => (
          <Link key={card.id} to={`/card/${card.id}`}>
            <div key={card.id} style={{ margin: '10px' }}>
              <img src={card.imageUrl} alt={card.name} style={{ width: '100px', height: 'auto' }} />
              <p>{card.name}</p>
              <img src={card.imageCroppedUrl} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListCard