import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux Toolkit/Store";
import { performLogout } from "../../Redux Toolkit/Customer/AuthSlice";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

const handleLogout = () => {
  dispatch(performLogout(navigate));
};

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">Admin Panel</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;