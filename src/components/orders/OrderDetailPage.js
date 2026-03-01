import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../../actions/orderAction";
import Loader from "../layout/Loader";
import OrderItemsTable from "./OrderItemsTable";
import StatusBadge from "./StatusBadge";

const getField = (obj, ...keys) => {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null) return obj[key];
  }
  return undefined;
};

const normalizePayload = (payload) => payload?.data || payload?.Data || payload || null;

const formatAddress = (addressValue) => {
  if (!addressValue) return "Sin dirección registrada";

  if (typeof addressValue === "string") return addressValue;

  if (typeof addressValue === "object") {
    const direccion = getField(addressValue, "direccion", "Direccion", "street", "Street");
    const ciudad = getField(addressValue, "ciudad", "Ciudad", "city", "City");
    const departamento = getField(addressValue, "departamento", "Departamento", "state", "State");
    const codigoPostal = getField(addressValue, "codigoPostal", "CodigoPostal", "zipCode", "ZipCode", "postalCode", "PostalCode");
    const pais = getField(addressValue, "pais", "Pais", "country", "Country");

    const formatted = [direccion, ciudad, departamento, codigoPostal, pais]
      .filter((value) => value !== undefined && value !== null && String(value).trim() !== "")
      .map((value) => String(value).trim())
      .join(", ");

    return formatted || "Sin dirección registrada";
  }

  return String(addressValue);
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { myOrderDetail, loadingDetail, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  const detail = useMemo(() => normalizePayload(myOrderDetail), [myOrderDetail]);

  if (loadingDetail) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        {error}
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="alert alert-info mt-4" role="alert">
        No se encontró el detalle de la orden.
      </div>
    );
  }

  const orderId = getField(detail, "id", "Id");
  const address = formatAddress(getField(detail, "orderAddress", "OrderAddress"));
  const statusLabel = getField(detail, "statusLabel", "StatusLabel");
  const orderItems = getField(detail, "orderItems", "OrderItems");
  const subtotal = Number(getField(detail, "subtotal", "Subtotal") || 0);
  const impuesto = Number(getField(detail, "impuesto", "Impuesto") || 0);
  const precioEnvio = Number(getField(detail, "precioEnvio", "PrecioEnvio") || 0);
  const total = Number(getField(detail, "total", "Total") || 0);

  return (
    <section className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Orden #{orderId ?? "-"}</h2>
        <Link to="/my-orders" className="btn btn-outline-secondary btn-sm">
          Volver
        </Link>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <h6 className="text-muted mb-1">Dirección de entrega</h6>
              <p className="mb-0">{address}</p>
            </div>
            <div className="col-12 col-md-4 text-md-end">
              <h6 className="text-muted mb-1">Estado</h6>
              <StatusBadge statusLabel={statusLabel} />
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Productos</h5>
          <OrderItemsTable items={orderItems} />
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Resumen</h5>
          <div className="d-flex justify-content-between py-1 border-bottom">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="d-flex justify-content-between py-1 border-bottom">
            <span>Impuesto</span>
            <strong>${impuesto.toFixed(2)}</strong>
          </div>
          <div className="d-flex justify-content-between py-1 border-bottom">
            <span>Precio envío</span>
            <strong>${precioEnvio.toFixed(2)}</strong>
          </div>
          <div className="d-flex justify-content-between py-2 mt-1">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailPage;
