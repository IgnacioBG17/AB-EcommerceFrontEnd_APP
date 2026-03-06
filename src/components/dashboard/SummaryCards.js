import { Card, Col, Row } from "react-bootstrap";

const cardMap = [
  { key: "totalSales", label: "Total Ventas" },
  { key: "totalOrders", label: "Total Órdenes" },
  { key: "pendingOrders", label: "Órdenes Pendientes" },
  { key: "shippedOrders", label: "Órdenes Enviadas" },
  { key: "totalProducts", label: "Total Productos" },
];

const getSummaryValue = (summary, key) => {
  const source = summary?.data || summary?.Data || summary || {};
  const aliasMap = {
    totalSales: ["totalSales", "totalVentas", "ventasTotales"],
    totalOrders: ["totalOrders", "totalOrdenes", "ordenesTotales"],
    pendingOrders: ["pendingOrders", "ordenesPendientes", "ordenesPendientes"],
    shippedOrders: ["shippedOrders", "OrdenesEnviadas", "ordenesEnviadas"],
    totalProducts: ["totalProducts", "totalProductos", "productosTotales"],
  };

  const aliases = aliasMap[key] || [key];
  const foundKey = aliases.find((item) => source[item] !== undefined);
  return foundKey ? source[foundKey] : 0;
};

const SummaryCards = ({ summary }) => (
  <Row className="g-3 mb-2">
    {cardMap.map((item) => (
      <Col key={item.key} xs={12} sm={6} xl={2}>
        <Card className="kpi-card shadow-sm border-0 h-100">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted small">{item.label}</Card.Subtitle>
            <Card.Title className="display-6 mb-0 fw-bold">{getSummaryValue(summary, item.key)}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default SummaryCards;
