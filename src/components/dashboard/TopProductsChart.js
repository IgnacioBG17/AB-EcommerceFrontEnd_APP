import { Card, Placeholder } from "react-bootstrap";

const TopProductsChart = ({ data, loading }) => {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <Card className="chart-card border-0 shadow-sm">
      <Card.Body>
        <Card.Title>Top Productos</Card.Title>
        {loading ? (
          <Placeholder animation="glow"><Placeholder xs={12} style={{ height: 260 }} /></Placeholder>
        ) : (
          <div className="d-flex flex-column gap-2">
                        {data.map((item) => {
              return (
                <div key={item.label}>
                  <div className="d-flex justify-content-between small">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TopProductsChart;
