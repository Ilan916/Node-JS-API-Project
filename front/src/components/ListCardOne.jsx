import React, { useState, useEffect } from 'react';
import Pagination from './Pagination'
import { Link } from 'react-router-dom';
import axios from 'axios';

const CardsList = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const cardsPerPage = 10; // Défini selon votre préférence ou besoin

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assurez-vous que cette URL corresponde à votre API et qu'elle gère correctement les paramètres de pagination
        const response = await axios.get(`http://localhost:3001/cards?page=${currentPage}&limit=${cardsPerPage}`);
        if (response.data && response.data.cards && typeof response.data.total === 'number') {
          setCards(response.data.cards);
          setTotalCards(response.data.total);
        } else {
          console.error('Format de réponse inattendu:', response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cartes:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <div className="bg-color-black">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Cards</h2>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {cards.map((card) => (
            <Link key={card.id} to={`/card/${card.id}`}>
              <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <img src={card.imageCroppedUrl} alt={card.name} className="h-full w-full object-cover object-center sm:h-full sm:w-full"/>
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">{card.name}</h3>
                  <p className="text-sm text-gray-500">{card.ArcheType}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* <div className="flex justify-center mt-8">
          {[...Array(totalPages).keys()].map(number => (
            <button
              key={number + 1}
              onClick={() => handlePageClick(number + 1)}
              className={`mx-1 px-4 py-2 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black border border-gray-300'}`}
            >
              {number + 1}
            </button>
          ))}
        </div> */}
         <Pagination currentPage={currentPage} totalPages={Math.ceil(totalCards / cardsPerPage)} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default CardsList;
