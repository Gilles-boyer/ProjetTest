// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Layout from "../components/layouts/Layout";
import CategoriesPage from "../pages/CategoriesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Route d’accueil */}
        <Route element={<HomePage />} />

        {/* Page de connexion */}
        <Route path="/login" element={<LoginPage />} />

        {/* Page de gestion catégorie */}
        <Route path="/category" element={<CategoriesPage />} />
      </Route>
    </Routes>
  );
}
