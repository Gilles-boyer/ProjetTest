// src/components/offers/OfferModal.jsx
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import apiCategories from '../../services/apiCategories';


const schema = yup.object().shape({
  title: yup.string().required('Le titre est requis'),
  description: yup.string().required('La description est requise'),
  category: yup
    .object()
    .nullable()
    .required('Veuillez sélectionner une catégorie'),
});

export default function OfferModal({ open, onClose, offer, onSave }) {
  const [categoryOptions, setCategoryOptions] = useState([]);

  // Charger la liste des catégories via l'API
  useEffect(() => {
    apiCategories
      .getCategories()
      .then((response) => {
        const options = Array.isArray(response.data)
          ? response.data.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))
          : [];
        setCategoryOptions(options);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories", error);
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // Validation en direct
  });

  // Remise à zéro du formulaire en fonction de l'offre
  useEffect(() => {
    if (offer) {
      // Remplit la valeur par défaut dans le select à partir de l'objet offer
      const defaultCategory = offer.category
        ? { value: offer.category.id, label: offer.category.name }
        : null;
      reset({ ...offer, category: defaultCategory });
    } else {
      reset({ title: '', description: '', is_active: true, category: null });
    }
  }, [offer, reset]);

  const onSubmit = (data) => {
    // Transformer les données pour n'envoyer que l'id de la catégorie
    const payload = { ...data, category_id: data.category.value };
    delete payload.category;
    onSave(offer ? { ...offer, ...payload } : payload);
    reset({ title: '', description: '', is_active: true, category: null });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary mb-4">
          {offer ? 'Modifier une offre' : 'Ajouter une offre'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Titre
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Catégorie
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={categoryOptions}
                  placeholder="Sélectionnez une catégorie..."
                  isClearable
                  classNamePrefix="react-select"
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-between">
              <span className="label-text text-sm text-gray-700">Actif</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                {...register('is_active')}
              />
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              className="btn border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="btn bg-primary hover:bg-primaryHover text-white disabled:opacity-50"
            >
              {offer ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
