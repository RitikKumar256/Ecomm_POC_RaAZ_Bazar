import React from "react";
import AdminNavbar from "../components/navbar/AdminNavbar";

const AdminLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* TOP NAVBAR */}
      <AdminNavbar />

      <div className="flex flex-1">

        {/* SIDEBAR (we will build next step) */}
        <div className="w-64 bg-gray-900 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Admin Menu</h2>

          <ul className="space-y-3">
            <li>Dashboard</li>
            <li>Sellers</li>
            <li>Coupons</li>
            <li>Products</li>
          </ul>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-6 bg-gray-100">
          {children}
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;