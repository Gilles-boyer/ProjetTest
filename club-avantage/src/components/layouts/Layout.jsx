import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="drawer lg:drawer-open h-screen">
      {/* 📌 Drawer toggle checkbox */}
      <input id="layout-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-[#e7e2db] text-[#3a2c23]">
          <Outlet />
        </main>
        <Footer />
      </div>

      <div className="drawer-side">
        {/* 🛑 Overlay for closing on mobile */}
        <label htmlFor="layout-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
}


