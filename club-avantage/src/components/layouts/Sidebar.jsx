import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserAlt, FaGift, FaUsers, FaTag } from "react-icons/fa";

const menu = [
  { to: "/", icon: <FaHome />, label: "Accueil" },
  { to: "/category", icon: <FaTag />, label: "Catégorie" },
  { to: "/offer", icon: <FaGift />, label: "Offres" },
  { to: "/members", icon: <FaUsers />, label: "Membres" },
  { to: "/profile", icon: <FaUserAlt />, label: "Profil" },
];

export default function Sidebar() {
  return (
    <aside className="bg-[#3a2c23] text-[#e7e2db] w-64 h-full p-6 shadow-lg">
      <div className="text-xl font-bold mb-8">ClubAvantage</div>
      <ul className="menu space-y-2">
        {menu.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#d6b68b] text-[#3a2c23] font-semibold'
                    : 'hover:bg-[#a48663] hover:text-white'
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}


