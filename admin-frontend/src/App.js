import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
// import Navbar from 'react-bootstrap/Navbar';
//import Badge from 'react-bootstrap/Badge';
// import Badge from '@mui/material/Badge';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import SigninScreen from './screens/SigninScreen';
// import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from './screens/SignupScreen';
// import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
// import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import NavbarHeader from './components/NavbarHeader';
// import SearchBox from './components/SearchBox';

import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/Dashboard/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import PosScreen from './screens/PosScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MapScreen from './screens/MapScreen';
import HoldScreen from './screens/HoldScreen';
// import ViewListIcon from '@mui/icons-material/ViewList';
// import Footer from "./components/Footer";

import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import UserList from './screens/userList/UserList';
import User from './screens/user/User';
import Layout from './screens/layout';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import CategoryListScreen from './screens/CategoryListScreen';
import CategoryEditScreen from './screens/CategoryEditScreen';

// import App from "./App";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { fullBox, favorite, cart, userInfo } = state;
  const { userInfo } = state;
  console.log('userInfo inside APP.js');
  console.log(userInfo);
  // const mode = "dark";
  const mode = 'light';
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    // localStorage.removeItem("shippingAddress");
    // localStorage.removeItem("paymentMethod");
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/holding" element={<HoldScreen />} />
            <Route
              path="/pos"
              element={
                <AdminRoute>
                  <PosScreen />
                </AdminRoute>
              }
            ></Route>

            {userInfo && userInfo.isAdmin ? (
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
                {/* <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/profile" element={<ProfileScreen />} /> */}
                {/* <Route path="/users" element={<UserList />} />
                <Route path="/user/:userId" element={<User />} /> */}

                {/* <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfileScreen />
                    </ProtectedRoute>
                  }
                />
               
                <Route path="/placeorder" element={<PlaceOrderScreen />} />*/}
                <Route
                  path="/map"
                  element={
                    <ProtectedRoute>
                      <MapScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order/:id"
                  element={
                    <ProtectedRoute>
                      <OrderScreen />
                    </ProtectedRoute>
                  }
                ></Route>

                {/* <Route
                  path="/shipping"
                  element={<ShippingAddressScreen />}
                ></Route> */}
                {/* <Route
                  path="/payment"
                  element={<PaymentMethodScreen />}
                ></Route> */}
                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <DashboardScreen />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoute>
                      <OrderListScreen />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/admin/users"
                  element={
                    <AdminRoute>
                      <UserListScreen />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <ProductListScreen />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/orderhistory"
                  element={
                    <AdminRoute>
                      <OrderHistoryScreen />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/admin/product/:id"
                  element={
                    <AdminRoute>
                      <ProductEditScreen />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/admin/product"
                  element={
                    <AdminRoute>
                      <ProductEditScreen />
                    </AdminRoute>
                  }
                ></Route>
                 <Route
                  path="/admin/categories"
                  element={
                    <AdminRoute>
                      <CategoryListScreen />
                    </AdminRoute>
                  }
                ></Route>

                <Route
                  path="/admin/category/:id"
                  element={
                    <AdminRoute>
                      <CategoryEditScreen />
                    </AdminRoute>
                  }
                ></Route>
                {/* <Route
                  path="/pos"
                  element={
                    <AdminRoute>
                      <PosScreen />
                    </AdminRoute>
                  }
                ></Route> */}
                <Route
                  path="/admin/user/:id"
                  element={
                    <AdminRoute>
                      <UserEditScreen />
                    </AdminRoute>
                  }
                ></Route>

                {/* <Route path="/" element={<HomeScreen />} exact /> */}
              </Route>
            ) : (
              <Route path="/" element={<SigninScreen />} />
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
