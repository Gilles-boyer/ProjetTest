// src/components/Header.jsx
import React from "react";
import { FaBars } from "react-icons/fa";

export default function Header() {
  return (
    <header className="navbar bg-[#a48663] text-white shadow-md sticky top-0 z-20">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="layout-drawer"
          className="btn btn-square btn-ghost text-white"
        >
          <FaBars />
        </label>
      </div>
      <div className="flex-1">
        <span className="btn btn-ghost text-xl font-bold text-white">
          ClubAvantageCSE
        </span>
      </div>
      <div className="flex-none">
        <button className="btn btn-ghost btn-circle text-white">
          <span className="indicator">
            🔔
            <span className="badge badge-xs bg-[#d6b68b] indicator-item"></span>
          </span>
        </button>
      </div>
    </header>
  );
}
