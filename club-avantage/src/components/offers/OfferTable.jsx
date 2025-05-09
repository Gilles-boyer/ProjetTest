// src/components/offers/OfferTable.jsx
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function OfferTable({ offers, onEdit, onDelete, onToggleActive }) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filtrage des offres selon le titre
  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const paginatedOffers = filteredOffers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Rechercher une offre..."
        className="input input-bordered mb-4 w-full max-w-md"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Description</th>
            <th>Actif</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOffers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.title}</td>
              <td>{offer.category?.name || 'Non défini'}</td>
              <td>{offer.description}</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  style={{ width: '2rem', height: '1.2rem' }}
                  checked={offer.is_active}
                  onChange={() => onToggleActive(offer.id)}
                />
              </td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm bg-primary text-white"
                  onClick={() => onEdit(offer)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm bg-red-500 text-white"
                  onClick={() => onDelete(offer.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            className="btn btn-sm bg-primary text-white"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            className="btn btn-sm bg-primary text-white"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
