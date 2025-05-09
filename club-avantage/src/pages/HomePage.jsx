// src/pages/HomePage.jsx
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Accueil</h1>
      <Link to="/login" className="text-blue-500 underline">
        Aller à la page de login
      </Link>
    </div>
  )
}
