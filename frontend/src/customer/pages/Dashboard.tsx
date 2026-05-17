import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

    const [data, setData] = useState<any>({});

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {

        try {

            const token = localStorage.getItem("jwt");

            const response = await axios.get(
                "http://localhost:5454/admin/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setData(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold mb-10">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <div className="shadow-lg rounded-xl p-6 bg-white">

                    <h2 className="text-xl font-semibold">
                        Total Users
                    </h2>

                    <p className="text-4xl mt-4">
                        {data.totalUsers}
                    </p>

                </div>

                <div className="shadow-lg rounded-xl p-6 bg-white">

                    <h2 className="text-xl font-semibold">
                        Online Users
                    </h2>

                    <p className="text-4xl mt-4">
                        {data.onlineUsers}
                    </p>

                </div>

                <div className="shadow-lg rounded-xl p-6 bg-white">

                    <h2 className="text-xl font-semibold">
                        Total Products
                    </h2>

                    <p className="text-4xl mt-4">
                        {data.totalProducts}
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;