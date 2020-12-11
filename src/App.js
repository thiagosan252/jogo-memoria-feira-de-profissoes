import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'reactstrap';
import './App.css';

function App() {

  var numbers = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

  const [currentTime, setCurrentTime] = useState(15);
  const [hitsCount, setHitsCount] = useState(0);
  const [errorsCount, setErrosCount] = useState(0);

  /*eslint no-unused-vars:*/
  var contador;
  var count = 16;

  const start = () => {
    if ((count - 1) >= 0) {
      count = count - 1;
      contador = setTimeout(start, 1000);
      setCurrentTime(count);
    }
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center m-3 h-100">
        <Col className="d-flex justify-content-start">
          <div className="txt-status">
            <span className="txt-dark txt-bold">Tempo:</span>{" "}
            <span className="txt-dark">{currentTime}s</span>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">
          <div className="txt-status">
            <span className="txt-status-success txt-bold">Acertos:</span>{" "}
            <span className="txt-dark">{hitsCount}</span>
          </div>
        </Col>
        <Col className="d-flex justify-content-start">
          <div className="txt-status">
            <span className="txt-status-danger txt-bold">Erros:</span>{" "}
            <span className="txt-dark">{errorsCount}</span>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button color="primary" onClick={start}>Novo Jogo</Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {numbers.map((item, index) => {
          return (
            <Col key={index} className="col-auto mb-1 p-1">
              <Card style={{ width: '7.3rem', height: '6.3rem' }} body>{item}</Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;
