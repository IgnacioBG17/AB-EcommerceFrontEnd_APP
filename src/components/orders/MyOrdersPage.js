import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader";
import OrderTable from "./OrderTable";

const getOrderId = (order) => order?.id ?? order?.Id ?? 0;

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.$values)) return value.$values;
  return [];
};

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { myOrders, myOrdersPagination, loadingList, error } = useSelector((state) => state.order);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [idFilter, setIdFilter] = useState("");

  useEffect(() => {
    const request = {
      pageIndex,
      pageSize,
    };

    if (idFilter.trim()) {
      request.id = idFilter.trim();
    }

    dispatch(fetchMyOrders(request));
  }, [dispatch, pageIndex, pageSize, idFilter]);

  const orderedList = useMemo(() => {
    const normalizedOrders = toArray(myOrders);
    return [...normalizedOrders].sort((a, b) => Number(getOrderId(b)) - Number(getOrderId(a)));
  }, [myOrders]);

  const totalPages = myOrdersPagination?.pageCount || 0;

  return (
    <section className="py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h2 className="mb-0">Mis órdenes</h2>

        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por Id"
            value={idFilter}
            onChange={(e) => {
              setPageIndex(1);
              setIdFilter(e.target.value);
            }}
          />
          {idFilter && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                setPageIndex(1);
                setIdFilter("");
              }}
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {loadingList ? (
        <div className="d-flex justify-content-center py-5">
          <Loader />
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          <OrderTable orders={orderedList} />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2">
            <small className="text-muted">
              Mostrando {myOrdersPagination?.resultByPage || orderedList.length} de {myOrdersPagination?.count || 0}
            </small>

            <div className="btn-group" role="group" aria-label="Paginación órdenes">
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={pageIndex <= 1}
                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
              >
                Anterior
              </button>
              <button type="button" className="btn btn-light" disabled>
                Página {pageIndex}{totalPages ? ` de ${totalPages}` : ""}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={totalPages ? pageIndex >= totalPages : orderedList.length < pageSize}
                onClick={() => setPageIndex((prev) => prev + 1)}
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MyOrdersPage;
