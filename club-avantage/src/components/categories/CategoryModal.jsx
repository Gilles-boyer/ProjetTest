// src/components/categories/CategoryModal.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required('Le nom est requis'),
  description: yup.string().required('La description est requise'),
});

export default function CategoryModal({ open, onClose, category, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (category) {
      reset(category);
    } else {
      reset({ name: '', description: '', is_active: true });
    }
  }, [category, reset]);

  const onSubmit = (data) => {
    if (category) {
      onSave({ ...category, ...data });
    } else {
      onSave(data);
    }

    reset({ name: '', description: '', is_active: true });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#a48663] mb-4">
          {category ? 'Modifier une catégorie' : 'Ajouter une catégorie'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Nom</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-between">
              <span className="label-text text-sm text-gray-700">Active</span>
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
              className="btn bg-[#a48663] hover:bg-[#8a6f53] text-white"
            >
              {category ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

