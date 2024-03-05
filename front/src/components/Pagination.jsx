import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Nombre de pages à afficher de chaque côté de la page actuelle
  const pageNeighbours = 1;

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  const fetchPageNumbers = () => {
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = ['...', ...extraPages, ...pages];
          break;
        }
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, '...'];
          break;
        }
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = ['...', ...pages, '...'];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  const pages = fetchPageNumbers();

  return (
    <nav className="flex justify-center mt-8">
      {pages.map((page, index) => {
        if (page === '...') {
          return <span key={index} className="px-3 py-1">...</span>;
        } else {
          return (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              disabled={currentPage === page}
              className={`mx-1 px-4 py-2 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-black border border-gray-300'}`}
            >
              {page}
            </button>
          );
        }
      })}
    </nav>
  );
};

export default Pagination;
