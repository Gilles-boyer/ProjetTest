import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function CategoryTable({ categories, onEdit, onDelete, onToggleActive }) {
  const [search, setSearch] = useState('');

  const filtered = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Rechercher..."
        className="input input-bordered mb-4 w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
          {filtered.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={cat.is_active}
                  onChange={() => onToggleActive(cat.id)}
                />
              </td>
              <td className="space-x-2">
                <button className="btn btn-sm btn-ghost text-[#a48663]" onClick={() => onEdit(cat)}>
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
    </div>
  );
}
