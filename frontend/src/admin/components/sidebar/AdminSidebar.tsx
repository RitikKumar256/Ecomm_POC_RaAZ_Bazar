import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Coupons", path: "/coupon" },
    { name: "Add Coupon", path: "/add-coupon" },
    { name: "Home Grid", path: "/home-grid" },
    { name: "Electronics", path: "/electronics-category" },
    { name: "Shop By Category", path: "/shop-by-category" },
    { name: "Deals", path: "/deals" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">

      <h2 className="text-xl font-bold mb-6">
        Admin Menu
      </h2>

      <div className="space-y-2">

        {menu.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`cursor-pointer p-2 rounded ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminSidebar;