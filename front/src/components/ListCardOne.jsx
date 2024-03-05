import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Example() {
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {cards.map((card) => (
            <Link key={card.id} to={`/card/${card.id}`}>
            <div
              key={card.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <img
                  src={card.imageCroppedUrl}
                  alt={card.name}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                    {card.name}
                </h3>
                <p className="text-sm text-gray-500">{card.desc}</p>
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-sm italic text-gray-500">{card.ArcheType}</p>
                  <p className="text-base font-medium text-gray-900">{card.price}</p>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
