// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer bg-[#a48663] text-white p-4 text-center shadow-inner">
      <div className="text-sm text-center mx-auto">
        <p>
          © {new Date().getFullYear()} ClubAvantageCSE. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
