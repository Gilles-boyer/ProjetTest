// src/pages/OffersPage.jsx
import React, { useState, useEffect } from 'react';
import OfferTable from '../components/offers/OfferTable';
import OfferModal from '../components/offers/OfferModal';
import ToastAlert from '../components/ToastAlert';
import apiOffers from '../services/apiOffers';

export default function OffersPage() {
  // État pour la gestion des offres
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [loading, setLoading] = useState(false);

  // Chargement initial des offres
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await apiOffers.getOffers();
      setOffers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setToast({
        show: true,
        message: "Erreur lors du chargement des offres.",
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Ouvre la modale en mode ajout
  const handleAdd = () => {
    setSelectedOffer(null);
    setModalOpen(true);
  };

  // Ouvre la modale en mode édition
  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setModalOpen(true);
  };

  // Suppression d'une offre
  const handleDelete = async (id) => {
    try {
      await apiOffers.deleteOffer(id);
      setOffers(prev => prev.filter((o) => o.id !== id));
      setToast({
        show: true,
        message: 'Offre supprimée avec succès.',
        type: 'success',
      });
    } catch (error) {
      setToast({
        show: true,
        message: "Erreur lors de la suppression de l'offre.",
        type: 'error',
      });
    }
  };

  // Sauvegarde lors de l'ajout ou de l'édition
  const handleSave = async (offer) => {
    try {
      let response;
      if (offer.id) {
        // Modification de l'offre existante
        response = await apiOffers.updateOffer(offer);
        setOffers(prev =>
          prev.map((o) => (o.id === offer.id ? response.data : o))
        );
        setToast({
          show: true,
          message: 'Offre mise à jour avec succès.',
          type: 'success',
        });
      } else {
        // Ajout d'une nouvelle offre
        response = await apiOffers.setOffer(offer);
        setOffers(prev => [...prev, response.data]);
        setToast({
          show: true,
          message: 'Offre ajoutée avec succès.',
          type: 'success',
        });
      }
      setModalOpen(false);
    } catch (error) {
      setToast({
        show: true,
        message: error?.response?.data?.message || "Erreur lors de l'enregistrement de l'offre.",
        type: 'error',
      });
    }
  };

  // Bascule l'état actif/inactif d'une offre
  const handleToggleActive = async (id) => {
    const offer = offers.find(o => o.id === id);
    if (!offer) return;
    try {
      const updated = { ...offer, is_active: !offer.is_active };
      const response = await apiOffers.updateOffer(updated);
      setOffers(prev =>
        prev.map((o) => (o.id === id ? response.data : o))
      );
    } catch (error) {
      setToast({
        show: true,
        message: "Erreur lors de la mise à jour du statut de l'offre.",
        type: 'error',
      });
    }
  };

  return (
    <div className="p-4">
      {/* En-tête de la page */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Offres</h1>
        <button className="btn bg-primary text-white" onClick={handleAdd}>
          Ajouter une offre
        </button>
      </div>

      {/* Affichage du tableau ou message de chargement */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <OfferTable
          offers={offers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />
      )}

      {/* Composant modale pour ajouter/modifier une offre */}
      <OfferModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        offer={selectedOffer}
        onSave={handleSave}
      />

      {/* Composant de notification */}
      <ToastAlert toast={toast} setToast={setToast} />
    </div>
  );
}

