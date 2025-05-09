// src/routes/AppRoutes.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layouts/Layout';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const OffersPage = lazy(() => import('../pages/OffersPage'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-4">Chargement...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/offer" element={<OffersPage />} />
          {/* Ajoute d'autres routes au besoin */}
        </Route>
      </Routes>
    </Suspense>
  );
}

