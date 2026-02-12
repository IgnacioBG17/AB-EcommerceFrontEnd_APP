import React from "react";
import { Link } from "react-router-dom";

const adminOptions = [
  { label: "Dashboard", to: "/dashboard", icon: "fas fa-tachometer-alt" },
  { label: "Products", to: "/dashboard/products", icon: "fas fa-box" },
  { label: "Ordenes", to: "/dashboard/orders", icon: "fas fa-shopping-basket" },
  { label: "Usuarios", to: "/dashboard/users", icon: "fas fa-users" },
  { label: "Reviews", to: "/dashboard/reviews", icon: "fas fa-star" },
];

const Dashboard = () => {
  return (
    <div className="admin-dashboard-page">
      <aside className="admin-sidebar-panel">
        <h2 className="admin-sidebar-title">Panel</h2>
        <nav>
          <ul className="admin-sidebar-links">
            {adminOptions.map((option) => (
              <li key={option.label}>
                <Link to={option.to}>
                  <i className={option.icon} aria-hidden="true" />
                  <span>{option.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <section className="admin-dashboard-content">
        <h1>Dashboard</h1>
        <p>Selecciona una opción del menú para administrar la tienda.</p>
      </section>
    </div>
  );
};

export default Dashboard;
