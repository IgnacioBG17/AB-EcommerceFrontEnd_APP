import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductDetail from "./components/product/ProductDetail";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "./actions/categoryAction";
import Login from "./components/security/Login";
import Register from "./components/security/Register";
import Profile from "./components/security/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userAction";
import UpdateProfile from "./components/security/UpdateProfile";
import ForgotPassword from "./components/security/ForgotPassword";
import NewPassword from "./components/security/NewPassword";
import UpdatePassword from "./components/security/UpdatePassword";
import { getShoppingCart } from "./actions/cartAction";
import Cart from "./components/cart/Cart";
import { getCountries } from "./actions/countryAction";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Wrapper from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import { useTheme } from "./hooks/useTheme";
import Dashboard from "./components/dashboard/Dashboard";
import MyOrdersPage from "./components/orders/MyOrdersPage.js";
import OrderDetailPage from "./components/orders/OrderDetailPage.js";

const AppLayout = ({ toggleTheme, theme }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/dashboard";

  return (
    <div className="App">
      <Header onToggleTheme={toggleTheme} currentTheme={theme} />
      <div className={isDashboardRoute ? "container-fluid dashboard-container" : "container container-fluid"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<NewPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path="/me" element={<ProtectedRoute />}>
            <Route path="/me" element={<Profile />} />
          </Route>

          <Route exact path="/me/update" element={<ProtectedRoute />}>
            <Route path="/me/update" element={<UpdateProfile />} />
          </Route>

          <Route exact path="/password/update" element={<UpdatePassword />}>
            <Route path="/password/update" element={<UpdatePassword />} />
          </Route>

          <Route exact path="/shipping" element={<Shipping />}>
            <Route path="/shipping" element={<Shipping />} />
          </Route>

          <Route exact path="/order/confirm" element={<ConfirmOrder />}>
            <Route path="/order/confirm" element={<ConfirmOrder />} />
          </Route>

          <Route exact path="/payment" element={<Wrapper />}>
            <Route path="/payment" element={<Wrapper />} />
          </Route>

          <Route exact path="/success" element={<OrderSuccess />}>
            <Route path="/success" element={<OrderSuccess />} />
          </Route>


          <Route element={<ProtectedRoute />}>
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/my-orders/:id" element={<OrderDetailPage />} />
          </Route>
        </Routes>
      </div>
      <Footer className={isDashboardRoute ? "footer-dashboard" : ""} />
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    dispatch(getCategories({}));
    dispatch(getShoppingCart({}));
    dispatch(getCountries({}));

    if (token) {
      dispatch(loadUser({}));
    }
  }, [dispatch, token]);

  return (
    <Router>
      <AppLayout toggleTheme={toggleTheme} theme={theme} />
    </Router>
  );
}

export default App;
