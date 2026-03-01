import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const getField = (obj, ...keys) => {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null) return obj[key];
  }
  return undefined;
};

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.$values)) return value.$values;
  return [];
};

const OrderTable = ({ orders }) => {
  const normalizedOrders = toArray(orders);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Estado</th>
            <th scope="col" className="text-center">Cantidad</th>
            <th scope="col" className="text-end">Total</th>
            <th scope="col" className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {normalizedOrders.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No se encontraron órdenes.
              </td>
            </tr>
          ) : (
            normalizedOrders.map((order, index) => {
              const orderId = getField(order, "id", "Id");
              const statusLabel = getField(order, "statusLabel", "StatusLabel");
              const cantidad = getField(order, "cantidad", "Cantidad") ?? 0;
              const total = Number(getField(order, "total", "Total") || 0);

              return (
                <tr key={orderId || index}>
                  <td>#{orderId ?? "-"}</td>
                  <td>
                    <StatusBadge statusLabel={statusLabel} />
                  </td>
                  <td className="text-center">{cantidad}</td>
                  <td className="text-end">${total.toFixed(2)}</td>
                  <td className="text-end">
                    <Link
                      to={orderId ? `/my-orders/${orderId}` : "/my-orders"}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
