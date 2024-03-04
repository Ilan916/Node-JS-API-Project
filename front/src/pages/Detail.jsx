import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
  const [cardDetails, setCardDetails] = useState(null);
  const { id } = useParams(); // Récupère l'id de la carte depuis l'URL
  console.log(cardDetails)
  useEffect(() => {
    
    // Remplace l'URL par l'endpoint de ton backend ou l'API Yu-Gi-Oh pour récupérer les détails de la carte
    axios.get(`http://localhost:3001/card/${id}`)
      .then(response => {
        setCardDetails(response.data); // Met à jour l'état avec les détails de la carte
      })
      .catch(error => console.error("Erreur lors de la récupération des détails de la carte :", error));
  }, [id]);

  if (!cardDetails) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{cardDetails.name}</h1>
      <img src={cardDetails.card_images[0].image_url} alt={cardDetails.name} />
      {/* Affiche d'autres détails de la carte ici */}
    </div>
  );
}

export default Detail