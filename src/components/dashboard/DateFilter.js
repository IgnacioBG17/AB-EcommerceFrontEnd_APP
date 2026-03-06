import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { setDateRange } from "../../slices/dashboardSlice";

const DateFilter = ({ onRefresh }) => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state) => state.dashboard);

  const onChangeDate = (event) => {
    const { name, value } = event.target;
    dispatch(
      setDateRange({
        startDate: name === "startDate" ? value : startDate,
        endDate: name === "endDate" ? value : endDate,
      })
    );
  };

  return (
    <Row className="g-2 align-items-end mb-3">
      <Col md={4}>
        <Form.Label>Fecha inicial</Form.Label>
        <Form.Control type="date" name="startDate" value={startDate} onChange={onChangeDate} />
      </Col>
      <Col md={4}>
        <Form.Label>Fecha final</Form.Label>
        <Form.Control type="date" name="endDate" value={endDate} onChange={onChangeDate} />
      </Col>
      <Col md={4}>
        <Button className="w-100" variant="warning" onClick={onRefresh}>
          Actualizar
        </Button>
      </Col>
    </Row>
  );
};

export default DateFilter;
