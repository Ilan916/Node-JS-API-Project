import React from 'react'
import { useState, useEffect } from 'react';
import PreviewCard  from './PreviewCard'
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListCard({limit}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des cartes:", error);
      });
  }, []);

  return (
    <>
      <div className='list-card-container'>
        {cards.map(card => (
          <Link key={card.id} to={`/card/${card.id}`}>
            <PreviewCard CardKey={card.id} CardImg={card.imageCroppedUrl} CardName={card.name} CardType={card.ArcheType}  />
          </Link>
        ))}
      </div>
    </>
  );
}

export default ListCard