import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Combien de pages adjacentes à montrer autour de la page courante
  const pageNeighbours = 1;

  // Crée un tableau de nombres entre 'from' et 'to' (inclus)
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  // Génère les numéros de page à afficher
  const fetchPageNumbers = () => {
    // Nombre total de blocs (numéros de page + 2 ellipses)
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    // Calcul des numéros de page seulement si le nombre total de pages est plus grand
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      // La plage initiale des pages, sans les ellipses
      let pages = range(startPage, endPage);

      // Variables pour vérifier s'il y a besoin d'ellipses
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      // Gestion des ellipses (spill)
      switch (true) {
        // Seulement des ellipses à gauche
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = ['...', ...extraPages, ...pages];
          break;
        }
        // Seulement des ellipses à droite
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, '...'];
          break;
        }
        // Des ellipses des deux côtés
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = ['...', ...pages, '...'];
          break;
        }
      }

      // Retourne la plage complète des numéros de page incluant les ellipses et les premières/dernières pages
      return [1, ...pages, totalPages];
    }

    // Retourne la plage complète des numéros de page s'il n'y a pas besoin d'ellipses
    return range(1, totalPages);
  };

  // Appel de la fonction pour obtenir les numéros de pages à afficher
  const pages = fetchPageNumbers();

  return (
    // Container de navigation pour les boutons de pagination
    <nav className="flex justify-center mt-8">
      {pages.map((page, index) => {
        // Rendu des ellipses ou des boutons numérotés
        if (page === '...') {
          // Rendu d'une ellipse comme un élément non-cliquable
          return <span key={index} className="px-3 py-1">...</span>;
        } else {
          // Rendu des boutons de numéros de page
          return (
            <button
              key={index}
              onClick={() => onPageChange(page)} // Gère le changement de page
              disabled={currentPage === page} // Désactive le bouton pour la page courante
              className={`mx-1 px-4 py-2 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-black border border-gray-300'}`}
            >
              {page} 
              {/* Numéro de la page */}
            </button>
          );
        }
      })}
    </nav>
  );
};

export default Pagination;
