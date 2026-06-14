import { Alert, Divider, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Order from './Order'
import UserDetails from './UserDetails'
import SavedCards from './SavedCards'
import OrderDetails from './OrderDetails'
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store'
import { performLogout } from '../../../Redux Toolkit/Customer/AuthSlice'
import Addresses from './Adresses'

const menu = [
    { name: "orders", path: "/account/orders" },
    { name: "profile", path: "/account/profile" },
    { name: "Saved Cards", path: "/account/saved-card" },

    { name: "Addresses", path: "/account/addresses" },
    { name: "Logout", path: "/" }
]
const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch()
    const { user,orders } = useAppSelector(store => store)
    const [snackbarOpen, setOpenSnackbar] = useState(false);

    const handleLogout = () => {
       dispatch(
         performLogout(
           navigate,
           "ROLE_CUSTOMER"
         )
       );

    }

   const handleClick = (item: any) => {

       if (item.name === "Logout") {

           handleLogout();

           return;
       }

       navigate(`${item.path}`);
   }
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        if (user.profileUpdated || orders.orderCanceled || user.error) {
            setOpenSnackbar(true);
        }
    }, [user.profileUpdated,orders.orderCanceled]);
    return (
        <div className='px-5 lg:px-52 min-h-screen mt-10 '>

            <div>
                <h1 className='text-xl font-bold pb-5'>{user.user?.fullName}</h1>
            </div>
            <Divider />
            <div className='grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]'>

                <div className="col-span-1 lg:border-r lg:pr-5 py-5 h-full  flex flex-row flex-wrap lg:flex-col gap-3">

                  {menu.map((item, index) => {

                      const isActive = item.path === location.pathname;

                      return (
                          <div
                              key={index}
                              onClick={() => handleClick(item)}
                              className={`
                                  px-5 py-3 rounded-xl cursor-pointer
                                  font-medium text-[16px]
                                  transition-all duration-300
                                  border

                                  ${isActive
                                      ? "bg-teal-600 text-white shadow-lg border-teal-600"
                                      : "bg-white text-gray-700 border-gray-200 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-400"
                                  }
                              `}
                          >
                              <p>{item.name}</p>
                          </div>
                      )
                  })}

                </div>
                <div className='lg:col-span-2 lg:pl-5 py-5'>

                    <Routes>
                        <Route path='/' element={<UserDetails />} />
                        <Route path='/orders' element={<Order />} />
                        <Route path='/orders/:orderId/:orderItemId' element={<OrderDetails />} />
                        <Route path='/profile' element={<UserDetails />} />
                        <Route path='/saved-card' element={<SavedCards />} />
                        <Route path='/addresses' element={<Addresses />} />
                        {/* addresses */}
                    </Routes>

                </div>

            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={user.error ? "error" : "success"}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {user.error ? user.error : orders.orderCanceled?"order canceled successfully": "success"}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Profile