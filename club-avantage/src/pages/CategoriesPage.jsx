import React, { useEffect, useState } from 'react';
import CategoryTable from '../components/categories/CategoryTable';
import CategoryModal from '../components/categories/CategoryModal';
import ToastAlert from '../components/ToastAlert';
import apiCategories from '../services/apiCategories';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [loading, setLoading] = useState(false);

  // Chargement initial
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiCategories.getCategories();
      console.log(response);
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setToast({ show: true, message: "Erreur lors du chargement des catégories.", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await apiCategories.deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
      setToast({ show: true, message: 'Catégorie supprimée avec succès.', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: "Erreur lors de la suppression.", type: 'error' });
    }
  };

  const handleSave = async (category) => {
    try {
      let response;
      if (category.id) {
        response = await apiCategories.updateCategory(category);
        setCategories(prev =>
          prev.map(cat => (cat.id === category.id ? response.data : cat))
        );
        setToast({ show: true, message: 'Catégorie mise à jour avec succès.', type: 'success' });
      } else {
        response = await apiCategories.setCategory(category);
        setCategories(prev => [...prev, response.data]);
        setToast({ show: true, message: 'Catégorie ajoutée avec succès.', type: 'success' });
      }
      setModalOpen(false);
    } catch (error) {
      setToast({
        show: true,
        message: error?.response?.data?.message || "Erreur lors de l'enregistrement.",
        type: 'error',
      });
    }
  };

  const handleToggleActive = async (id) => {
    const category = categories.find(cat => cat.id === id);
    if (!category) return;

    try {
      const updated = { ...category, is_active: !category.is_active };
      const response = await apiCategories.updateCategory(updated);
      setCategories(prev =>
        prev.map(cat => (cat.id === id ? response.data : cat))
      );
    } catch (error) {
      setToast({
        show: true,
        message: "Erreur lors de la mise à jour du statut.",
        type: 'error',
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Catégories</h1>
        <button className="btn bg-[#a48663] text-white" onClick={handleAdd}>Ajouter une catégorie</button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />
      )}

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
      />

      <ToastAlert toast={toast} setToast={setToast} />
    </div>
  );
}

