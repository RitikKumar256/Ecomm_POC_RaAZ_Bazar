import React, { useEffect, useState } from "react";
import { api } from "../../../Config/Api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    totalUsers: 0,
    onlineUsers: 0,
    totalProducts: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const response = await api.get("/admin/dashboard");

        if (isMounted) {
          setData(response.data);
          setError("");
        }
      } catch (error: any) {
        if (isMounted) {
          console.log("dashboard error", error);

          setError(
            error?.response?.data?.message ||
              "Failed to load dashboard"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    dispatch(performLogout(navigate));
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Users
          </h2>
          <p className="text-4xl font-bold mt-4 text-blue-600">
            {data.totalUsers}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Online Users
          </h2>
          <p className="text-4xl font-bold mt-4 text-green-600">
            {data.onlineUsers}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Products
          </h2>
          <p className="text-4xl font-bold mt-4 text-purple-600">
            {data.totalProducts}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;