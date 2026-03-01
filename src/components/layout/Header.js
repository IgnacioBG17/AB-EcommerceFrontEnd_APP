import React, { Fragment } from "react";
import "../../App.css";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../slices/securitySlice";
import { Link } from "react-router-dom";

const Header = ({ onToggleTheme, currentTheme }) => {
  const { user, loading } = useSelector((state) => state.security);
  const { shoppingCartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const alert = useAlert();

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Sesión cerrada correctamente");
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/logo_zindora.png" alt="Logo" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center d-flex align-items-center justify-content-center justify-content-md-end theme-actions">
          <button
            type="button"
            className="btn btn-lg"
            onClick={onToggleTheme}
            aria-label={
              currentTheme === "dark"
                ? "Cambiar a tema claro"
                : "Cambiar a tema oscuro"
            }
            title={
              currentTheme === "dark"
                ? "Cambiar a tema claro"
                : "Cambiar a tema oscuro"
            }
          >
            {currentTheme === "dark" ? "☀️" : "🌙"}
          </button>
          <Link to="/cart">
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {shoppingCartItems.length}
            </span>
          </Link>

          {/* Dropdown usuario */}
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav mb-0">
                  <img
                    src={user && user.avatar}
                    alt={user && user.nombre}
                    className="rounded-circle"
                  />
                </figure>
                <span className="ml-2">{user && user.nombre}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {user?.roles?.includes("ADMIN") && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}

                <Link className="dropdown-item" to="/my-orders">
                  Mis Compras
                </Link>

                <Link className="dropdown-item" to="/me">
                  Perfil
                </Link>

                <Link className="dropdown-item" to="/" onClick={logoutHandler}>
                  Cerrar sesión 
                </Link>
              </div>
            </div>
          ) : ( 
            /* Botón login */
            !loading && (
              <Link className="btn ml-4" id="login_btn" to="/login">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
