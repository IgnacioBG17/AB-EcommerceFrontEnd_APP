import { Card, Placeholder } from "react-bootstrap";

const getMonthName = (monthNumber) => {
  const months = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];
  // Si es un número (1-12), restamos 1 para el índice del array
  return months[parseInt(monthNumber) - 1] || `Mes ${monthNumber}`;
};

const SalesLineChart = ({ data, loading }) => {
  if (!loading && (!data || data.length === 0)) {
    return (
      <Card className="chart-card h-100 border-0 shadow-sm">
        <Card.Body>
          <Card.Title>Ventas por Mes</Card.Title>
          <div className="text-center py-5 text-muted">Sin datos</div>
        </Card.Body>
      </Card>
    );
  }

  const maxValue = Math.max(...data.map((item) => item.value), 1);

  // Generar puntos y etiquetas
  const pointsData = data.map((item, index) => {
    const x = data.length > 1 ? (index / (data.length - 1)) * 80 + 10 : 50; 
    const y = 80 - (item.value / maxValue) * 60; // Dejamos espacio arriba y abajo
    return { x, y, label: getMonthName(item.label), value: item.value };
  });

  const polylinePoints = pointsData.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <Card className="chart-card h-100 border-0 shadow-sm">
      <Card.Body>
        <Card.Title>Ventas por Mes</Card.Title>
        {loading ? (
          <Placeholder animation="glow"><Placeholder xs={12} style={{ height: 220 }} /></Placeholder>
        ) : (
          <svg viewBox="0 0 100 100" className="w-100" style={{ height: '250px' }}>
            {/* Línea del gráfico */}
            {data.length > 1 && (
              <polyline
                fill="none"
                stroke="#ffc107"
                strokeWidth="2"
                points={polylinePoints}
              />
            )}

            {/* Dibujar puntos y etiquetas de texto */}
            {pointsData.map((point, i) => (
              <g key={i}>
                {/* El punto */}
                <circle cx={point.x} cy={point.y} r="3" fill="#ffc107" />
                
                {/* Nombre del mes (Debajo del punto) */}
                <text 
                  x={point.x} 
                  y="95" 
                  fontSize="6" 
                  fill="white" 
                  textAnchor="middle"
                >
                  {point.label}
                </text>

                {/* Valor numérico (Opcional, encima del punto) */}
                <text 
                  x={point.x} 
                  y={point.y - 5} 
                  fontSize="5" 
                  fill="#adb5bd" 
                  textAnchor="middle"
                >
                  ${point.value.toLocaleString()}
                </text>
              </g>
            ))}
          </svg>
        )}
      </Card.Body>
    </Card>
  );
};

export default SalesLineChart;
