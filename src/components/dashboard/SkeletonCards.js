import { Card, Col, Placeholder, Row } from "react-bootstrap";

const SkeletonCards = () => (
  <Row className="g-3 mb-2">
    {Array.from({ length: 5 }).map((_, index) => (
      <Col key={index} xs={12} sm={6} xl={2}>
        <Card className="border-0 shadow-sm h-100">
          <Card.Body>
            <Placeholder as={Card.Subtitle} animation="glow">
              <Placeholder xs={7} />
            </Placeholder>
            <Placeholder as={Card.Title} animation="wave" className="mt-3">
              <Placeholder xs={5} size="lg" />
            </Placeholder>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default SkeletonCards;
