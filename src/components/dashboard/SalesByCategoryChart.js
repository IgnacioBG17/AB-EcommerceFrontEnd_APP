import { Card, Placeholder } from "react-bootstrap";

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6", "#14b8a6"];

const SalesByCategoryChart = ({ data, loading }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0) || 1;
  let cumulative = 0;

  return (
    <Card className="chart-card h-100 border-0 shadow-sm">
      <Card.Body>
        <Card.Title>Ventas por Categoría</Card.Title>
        {loading ? (
          <Placeholder animation="wave"><Placeholder xs={12} style={{ height: 220 }} /></Placeholder>
        ) : (
          <>
            <svg viewBox="0 0 36 36" className="w-100 pie-svg" role="img" aria-label="Ventas por categoría">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const dashArray = `${percentage} ${100 - percentage}`;
                const dashOffset = 25 - cumulative;
                cumulative += percentage;
                return (
                  <circle
                    key={item.label}
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth="3.8"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                  />
                );
              })}
            </svg>
            <div className="small mt-2">
              {data.map((item, index) => (
                <div key={item.label} className="d-flex justify-content-between">
                  <span>
                    <span className="legend-dot" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default SalesByCategoryChart;
