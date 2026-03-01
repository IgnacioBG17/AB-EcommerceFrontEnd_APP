import React from "react";

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

const getItemSubtotal = (item) => {
  const subtotal = getField(item, "subtotal", "Subtotal");

  if (subtotal !== undefined && subtotal !== null) {
    return Number(subtotal);
  }

  const quantity = Number(getField(item, "cantidad", "quantity", "Cantidad", "Quantity") || 0);
  const unitPrice = Number(getField(item, "precio", "price", "Precio", "Price") || 0);

  return quantity * unitPrice;
};

const OrderItemsTable = ({ items }) => {
  const normalizedItems = toArray(items);

  return (
    <div className="table-responsive">
      <table className="table table-borderless table-sm align-middle">
        <thead>
          <tr>
            <th scope="col">Producto</th>
            <th scope="col" className="text-center">Cantidad</th>
            <th scope="col" className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {normalizedItems.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">
                Esta orden no tiene productos.
              </td>
            </tr>
          ) : (
            normalizedItems.map((item, index) => {
              const image = getField(item, "imagenUrl", "image", "Imagen", "Image") || "/images/default_product.png";
              const name = getField(item, "productNombre", "name", "Nombre", "Name") || "Producto sin nombre";
              const quantity = getField(item, "cantidad", "quantity", "Cantidad", "Quantity") ?? 0;

              return (
                <tr key={getField(item, "id", "Id") || index}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={image}
                        alt={name}
                        style={{ width: 56, height: 56, objectFit: "cover" }}
                        className="rounded border me-2"
                      />
                      <span>{name}</span>
                    </div>
                  </td>
                  <td className="text-center">{quantity}</td>
                  <td className="text-end">${getItemSubtotal(item).toFixed(2)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItemsTable;
