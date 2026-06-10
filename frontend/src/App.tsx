
import './App.css';
import { ThemeProvider } from '@emotion/react';
import customeTheme from './Theme/customeTheme';
import { Route, Routes, useNavigate } from 'react-router-dom';

import AdminDashboard from './admin/pages/Dashboard/Dashboard';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';

import CustomerRoutes from './routes/CustomerRoutes';

import SellerAccountVerification from './seller/pages/SellerAccountVerification';
import SellerAccountVerified from './seller/pages/SellerAccountVerified';

import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';

import { useEffect } from 'react';

import { fetchSellerProfile } from './Redux Toolkit/Seller/sellerSlice';

import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';

import AdminAuth from './admin/pages/Auth/AdminAuth';

import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';

import { createHomeCategories } from './Redux Toolkit/Customer/Customer/AsyncThunk';

import { homeCategories } from './data/homeCategories';

import Mobile from './data/Products/mobile';
import AdminProtectedRoute from './routes/AdminProtectedRoute';
import SellerProtectedRoute from './routes/SellerProtectedRoute';
function App() {

  const dispatch = useAppDispatch();

  const auth = useAppSelector(state => state.auth);
  const sellerAuth = useAppSelector(state => state.sellerAuth);
  const sellers = useAppSelector(state => state.sellers);
  const user = useAppSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {


    const jwt =
      localStorage.getItem("admin_jwt") ||
      localStorage.getItem("seller_jwt") ||
      localStorage.getItem("customer_jwt");

    console.log("JWT TOKEN :", jwt);

    if (jwt) {

      dispatch(
        fetchUserProfile({
          jwt: jwt,
          navigate
        })
      );

      dispatch(
        fetchSellerProfile(jwt)
      );
    }

  }, [dispatch, navigate]);

  useEffect(() => {

    dispatch(createHomeCategories(homeCategories));

  }, [dispatch]);

  console.log("USER STATE :", user);
  console.log("USER ROLE :", user?.user?.role);

  return (

    <ThemeProvider theme={customeTheme}>

      <div className='App'>

        <Routes>

       <Route
         path='/seller/*'
         element={
           <SellerProtectedRoute>
             <SellerDashboard />
           </SellerProtectedRoute>
         }
       />

        <Route
          path='/admin/*'
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

          <Route
            path='/verify-seller/:otp'
            element={<SellerAccountVerification />}
          />

          <Route
            path='/seller-account-verified'
            element={<SellerAccountVerified />}
          />

          <Route
            path='/become-seller'
            element={<BecomeSeller />}
          />

          <Route
            path='/admin-login'
            element={<AdminAuth />}
          />

          <Route
            path='/dummy'
            element={<Mobile />}
          />

          <Route
            path='*'
            element={<CustomerRoutes />}
          />

        </Routes>

      </div>

    </ThemeProvider>
  );
}

export default App;
