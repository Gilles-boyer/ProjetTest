import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function CategoryTable({ categories, onEdit, onDelete, onToggleActive }) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filtered = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
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
        placeholder="Rechercher..."
        className="input input-bordered mb-4 w-full max-w-md"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
      />

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={cat.is_active}
                  onChange={() => onToggleActive(cat.id)}
                />
              </td>
              <td className="space-x-2">
                <button className="btn btn-sm btn-ghost text-primary" onClick={() => onEdit(cat)}>
                  <FaEdit />
                </button>
                <button className="btn btn-sm btn-ghost text-error" onClick={() => onDelete(cat.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          className="btn btn-sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

